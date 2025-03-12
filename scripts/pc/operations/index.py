from dotenv import load_dotenv
from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec
from pinecone.openapi_support import exceptions

from pc.preprocess.chunking import chunk_by_paragraph

load_dotenv()

pc = Pinecone()
openai = OpenAI()


def create_index(index_name, dimension):
    try:
        # Check if the index exists in the server
        pc.describe_index(index_name)
    except exceptions.NotFoundException:
        # If index hasn't been created yet:
        pc.create_index(
            name=index_name,
            dimension=dimension,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1"),
        )
        print(f"Created index '{index_name}'.")
    else:
        print(f"Index name {index_name} already exists. Proceed")

    return pc.Index(index_name)


# uses Microsoft's multilingual-e5-large embeddings
def upsert_data_microsoft(file_list, batch_size, index_name):
    index = create_index(index_name, 1024)

    for file_name in file_list:
        chunks = chunk_by_paragraph(file_name)

        # Store each document in vector with id tags
        data = []
        for i, paragraph in enumerate(chunks):
            data.append({"id": f"{file_name}:{i}", "text": paragraph})
        print(f"Document {file_name} has {len(data)} vectors.")

        # Get embeddings
        embeddings_list = []
        iter = int(len(data) / batch_size)
        for i in range(iter + 1):
            ind = i * batch_size
            partition = data[ind : ind + batch_size]
            embeddings = pc.inference.embed(
                model="multilingual-e5-large",
                inputs=[d["text"] for d in partition],
                parameters={"input_type": "passage", "truncate": "END"},
            )
            embeddings_list.append(embeddings)

        # Upsert data into index
        for i, embeddings in enumerate(embeddings_list):
            vectors = []
            ind = i * batch_size

            data_p = data[ind : ind + batch_size]
            for d, e in zip(data_p, embeddings):
                vectors.append(
                    {
                        "id": d["id"],
                        "values": e["values"],
                        "metadata": {
                            "text": d["text"],
                            "referenceUrl": f"https://www.esm.rochester.edu/beethoven/{file_name}",
                        },
                    }
                )
            response = index.upsert(vectors=vectors, namespace=f"{file_name}")
            print(response)


def upsert_data_openai(file_list, batch_size, index_name):
    index = create_index(index_name, dimension=1536)

    for file_name in file_list:
        chunks = chunk_by_paragraph(file_name)

        # Store each document in vector with id tags
        data = []
        for i, paragraph in enumerate(chunks):
            data.append({"id": f"{file_name}:{i}", "text": paragraph})
        print(f"Document {file_name} has {len(data)} vectors.")

        # Get embeddings
        embeddings_list = []
        iter = int(len(data) / batch_size)
        for i in range(iter + 1):
            ind = i * batch_size
            partition = data[ind : ind + batch_size]
            res = openai.embeddings.create(
                model="text-embedding-3-small", input=[d["text"] for d in partition]
            )
            embeddings_list.append(res.data)

        # Upsert data into index
        for i, embeddings in enumerate(embeddings_list):
            vectors = []
            ind = i * batch_size

            data_p = data[ind : ind + batch_size]
            for d, e in zip(data_p, embeddings):
                vectors.append(
                    {
                        "id": d["id"],
                        "values": e.embedding,
                        "metadata": {
                            "text": d["text"],
                            "referenceUrl": f"https://www.esm.rochester.edu/beethoven/{file_name}",
                        },
                    }
                )
            response = index.upsert(vectors=vectors, namespace=f"{file_name}")
            print(response)


def upsert_namespace_openai(index_name, batch_size, file_name="namespace"):
    index = create_index(index_name, dimension=1536)

    chunks = chunk_by_paragraph(file_name)
    data = []
    for i, namespace_content in enumerate(chunks):
        if i < 9:
            namespace = f"symphony-no-{i+1}"
        elif i == 10:
            namespace = "orchestra-discussions"
        else:
            namespace = "transitional-composer-and-heroic-objective"

        data.append({"id": f"{file_name}:{namespace}", "text": namespace_content})
    print(f"Document {file_name} has {len(data)} vectors.")

    embeddings_list = []
    iter = int(len(data) / batch_size)
    for i in range(iter + 1):
        ind = i * batch_size
        partition = data[ind : ind + batch_size]
        res = openai.embeddings.create(
            model="text-embedding-3-small", input=[d["text"] for d in partition]
        )
        embeddings_list.append(res.data)

    for i, embeddings in enumerate(embeddings_list):
        vectors = []
        ind = i * batch_size

        data_p = data[ind : ind + batch_size]
        for d, e in zip(data_p, embeddings):
            vectors.append(
                {
                    "id": d["id"],
                    "values": e.embedding,
                    "metadata": {
                        "text": d["text"],
                    },
                }
            )
        response = index.upsert(vectors=vectors, namespace=f"{file_name}")
        print(response)
