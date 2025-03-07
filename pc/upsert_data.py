from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec
from pinecone.openapi_support import exceptions
from preprocess.chunking import chunk_by_paragraph

load_dotenv()

pc = Pinecone()

index_name = "beethoven-symphony"

try:
    # Check if the index exists in the server
    pc.describe_index(index_name)
except exceptions.NotFoundException:
    # If index hasn't been created yet:
    pc.create_index(
        name=index_name,
        dimension=1024,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )
    print(f"Created index \'{index_name}\'.")
else:
    print(f"Index name {index_name} already exists. Proceed")

file_list = [
    "symphony-no-1",
    "symphony-no-2",
    "symphony-no-3",
    "symphony-no-4",
    "symphony-no-5",
    "symphony-no-6",
    "symphony-no-7",
    "symphony-no-8",
    "symphony-no-9",
    "orchestra-discussions",
    "transitional-composer-and-heroic-objective"
]

batch_size = 96
for file_name in ["symphony-no-9"]:
    chunks = chunk_by_paragraph(file_name)

    # Store each document in vector with id tags
    data = []
    for i, paragraph in enumerate(chunks):
        data.append({
            "id": f"{file_name}:{i}",
            "text": paragraph
        })
    print(f"Document {file_name} has {len(data)} vectors.")

    # Get embeddings
    embeddings_list = []
    iter = int(len(data)/batch_size)
    for i in range(iter + 1):
        ind = i*batch_size
        partition = data[ind:ind+batch_size]

        embeddings = pc.inference.embed(
            model="multilingual-e5-large",
            inputs=[d["text"] for d in partition],
            parameters={"input_type": "passage", "truncate": "END"}
        )
        embeddings_list.append(embeddings)

    # Upsert data
    index = pc.Index(index_name)

    for i, embeddings in enumerate(embeddings_list):
        vectors = []
        ind = i * batch_size

        data_p = data[ind:ind + batch_size]
        for d, e in zip(data_p, embeddings):
            vectors.append({
                "id": d["id"],
                "values": e["values"],
                "metadata": {
                    "text": d["text"],
                    "referenceUrl": f"https://www.esm.rochester.edu/beethoven/{file_name}"
                }
            })
        response = index.upsert(
            vectors=vectors,
            namespace=f"{file_name}"
        )
        print(response)

    # print(index.describe_index_stats())