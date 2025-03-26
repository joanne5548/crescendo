def chunk_by_paragraph(file_name):
    chunks = []
    with open(f"./data/rachmaninoff/{file_name}.txt", 'r') as file:
       for line in file:
            if (line == '\n'):
                continue
            chunks.append(line.rstrip())
    return chunks