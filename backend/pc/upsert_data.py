from pc.maintenance.index import upsert_data_microsoft, upsert_data_openai

index_name = "beethoven-symphony-openai"

file_list = [
    # "symphony-no-1",
    # "symphony-no-2",
    "symphony-no-3",
    "symphony-no-4",
    "symphony-no-5",
    "symphony-no-6",
    "symphony-no-7",
    "symphony-no-8",
    "symphony-no-9",
    "orchestra-discussions",
    "transitional-composer-and-heroic-objective",
]

# upsert_data_microsoft(file_list=file_list, batch_size=96, index_name=index_name)
upsert_data_openai(file_list, 96, "beethoven-symphony-openai")
