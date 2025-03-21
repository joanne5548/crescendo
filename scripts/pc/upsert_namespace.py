from pc.operations.index import upsert_namespace_openai

index_name = "beethoven-symphony-openai"

upsert_namespace_openai(index_name, batch_size=50)