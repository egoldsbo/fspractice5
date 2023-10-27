import os
import json

# Directory to scan for subfolders and files
base_directory = './vids'

# JavaScript file to append
js_to_append = 'script.js'

# Output JS file
output_file = 'a.js'

# Function to quote JavaScript strings
def js_string(s):
    return json.dumps(s)

# Start of the script
folders_content = []

# Traversing the directory and subdirectories
for root, dirs, files in os.walk(base_directory):
    for dir_name in dirs:
        folder_path = os.path.join(root, dir_name)
        files_in_folder = os.listdir(folder_path)
        # Creating JavaScript array string of file names
        array_content = '[' + ', '.join(js_string(f) for f in files_in_folder) + ']'
        folders_content.append("var {} = {};".format(dir_name.replace('-', '_'), array_content))

# Writing to a.js
with open(output_file, 'w') as f:
    for line in folders_content:
        f.write(line + '\n')

# Appending another JS file to a.js
with open(js_to_append, 'r') as f_append, open(output_file, 'a') as f_output:
    f_output.write('\n' + f_append.read())

# Rename a.js to script.js
os.rename(output_file, 'script2.js')
