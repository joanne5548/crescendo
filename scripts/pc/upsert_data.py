from pc.operations.index import upsert_data_openai

index_name = "beethoven-symphony-openai"

beethoven_file_list = [
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
    "transitional-composer-and-heroic-objective",
]

rachmaninoff_file_list = ["piano-concerto"]

# upsert_data_microsoft(beethoven_file_list=beethoven_file_list, batch_size=96, index_name=index_name)
# upsert_data_openai(beethoven_file_list, 96, "beethoven-symphony-openai")
upsert_data_openai(rachmaninoff_file_list, 96, "rachmaninoff-openai")
