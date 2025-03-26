from pc.operations.index import upsert_namespace_openai

# index_name = "beethoven-symphony-openai"
index_name = "rachmaninoff-openai"

upsert_namespace_openai(index_name, batch_size=50)