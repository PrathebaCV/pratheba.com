import os
import frontmatter
import markdown
from datetime import datetime

def convert_date(date_str):
    date = datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S')
    return date.strftime('%B %d, %Y')

def process_markdown_files():
    template_path = 'posts/post-template.html'
    with open(template_path, 'r', encoding='utf-8') as f:
        template = f.read()
    
    for filename in os.listdir('en_pakkam'):
        if filename.endswith(('.md', '.markdown')):
            with open(os.path.join('en_pakkam', filename), 'r', encoding='utf-8') as f:
                post = frontmatter.load(f)
            
            # Convert markdown to HTML
            html_content = markdown.markdown(post.content)
            
            # Format date
            date = convert_date(post['date'])
            
            # Create HTML file
            # Remove the date prefix and keep the rest of the filename
            output_filename = filename[11:].rsplit('.', 1)[0] + '.html'
            html = template.replace('{{title}}', post['title'])
            html = html.replace('{{date}}', date)
            html = html.replace('{{content}}', html_content)
            
            with open(os.path.join('posts', output_filename), 'w', encoding='utf-8') as f:
                f.write(html)
            
            print(f'Converted {filename} to {output_filename}')

if __name__ == '__main__':
    process_markdown_files()
