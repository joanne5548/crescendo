import requests
from bs4 import BeautifulSoup
import re

def scrape_right_column(url):
    """
    Scrape content from a div with class 'rightCol', extracting text from p tags
    while ignoring those with style='text-align: right' and empty paragraphs.
    
    Args:
        url (str): The URL of the webpage to scrape
        
    Returns:
        list: A list of extracted paragraph texts
    """
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise exception for bad status codes
    except requests.exceptions.RequestException as e:
        print(f"Error fetching the URL: {e}")
        return []
    
    # Parse HTML content
    soup = BeautifulSoup(response.text, 'html.parser')
    
    right_col = soup.find('div', class_='rightCol')
    
    if not right_col:
        print("No div with class 'rightCol' found.")
        return []
    
    # Find all p tags within the right column div
    heading = right_col.find('h1').get_text(strip=True)
    p_tags = right_col.find_all('p')
    
    # Extract text from valid p tags
    content = []
    for p in p_tags:
        style_attr = p.get('style', '')

        if 'text-align: right' in style_attr:
            continue

        text = p.get_text(strip=True)
        if text == '':
            content[-1] += '\n'
        elif text == '\xa0' or text == '\u00A0' or '&nbsp;' in str(p):
            print("newline markdown character detected")
            content.append('\n')
        else:
            content.append(text + ' ')
    
    return heading, content

def save_to_file(heading, content, filename="scraped_content.txt"):
    """
    Save the scraped content to a text file.
    
    Args:
        content (list): List of paragraph texts
        filename (str): Name of the output file
    """
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(heading + '\n\n\n')
        for paragraph in content:
            f.write(paragraph + '\n')
    
    print(f"Content saved to {filename}")

# Example usage
if __name__ == "__main__":
    url = input("Enter the URL to scrape: ")
    heading, content = scrape_right_column(url)
    
    slash = url.rfind('/')
    if (slash == len(url)-1):
        url = url[:len(url)-1]
    filename = f"data/beethoven/{url[url.rfind('/')+1:]}.txt"
    if content:
        print(f"Found {len(content)} paragraphs.")
        save_to_file(heading, content, filename)
        
        print("\nPreview of scraped content:")
        for i, paragraph in enumerate(content[:3]):
            print(f"{i+1}. {paragraph[:100]}...")
    else:
        print("No content was scraped.")