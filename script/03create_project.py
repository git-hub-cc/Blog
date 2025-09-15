
import os
import re

def create_project_from_ai_output(input_file="01base.md"):
    """
    Parses a markdown file containing file paths and code blocks from an AI
    and generates the corresponding project structure and files.
    This version uses a more robust and strict regex to avoid matching
    descriptive headers as file paths.
    """
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: Input file '{input_file}' not found.")
        print("Please save the AI's output into a file with that name in the same directory.")
        return

    # --- REGEX OPTIMIZATION ---
    # The original regex was too permissive and matched descriptive headers.
    # This new regex is stricter:
    # 1. `^(?:#+)\s+`: Matches the start of a line and markdown hashes (e.g., "#### ").
    # 2. `(?:_|\*\*)*`: Matches optional bold/italic markdown formatting around the path.
    # 3. `([a-zA-Z0-9/\\._-]+)`: This is the key part. It captures the file path. By placing
    #    it immediately after the markdown formatting, we prevent it from matching words
    #    inside a descriptive sentence (like capturing 'Java' from '后端 (Java Spring Boot)').
    # 4. `(?:_|\*\*)*`: Matches optional closing markdown formatting.
    # 5. `.*?\n`: Matches the rest of the header line.
    # 6. `.*?```: Finds the next code block.
    pattern = re.compile(
        # Header line matching
        r"^(?:#+)\s+"                 # Matches "### " at the start of a line
        r"(?:_|\*\*)*"                # Optional opening markdown formatting like **
        r"([a-zA-Z0-9/\\._-]+)"       # CAPTURE GROUP 1: The actual file path. Must start right away.
        r"(?:_|\*\*)*"                # Optional closing markdown formatting
        r".*?\n"                      # The rest of the line, e.g., "(New File)"

        # Bridge to code block
        r".*?"                        # Non-greedily match any characters (including newlines) until the code block

        # Code block matching
        r"```[a-zA-Z]*\n"             # Start of the code block, e.g., ```xml or ```
        r"(.*?)\n?```",                # CAPTURE GROUP 2: The code content
        re.DOTALL | re.MULTILINE
    )

    matches = pattern.findall(content)

    if not matches:
        print("No files and code blocks were found. Please check the format of the input file.")
        print("Ensure headers like '#### path/to/file.js' are followed by a ```code block```.")
        return

    print(f"Found {len(matches)} files to create. Starting project generation...\n")

    created_files_count = 0
    for file_path, code_content in matches:
        # Clean up the captured path, just in case.
        file_path = file_path.strip()

        # Normalize path separators for the current OS
        file_path = file_path.replace('/', os.path.sep).replace('\\', os.path.sep)
        
        # Skip any accidental empty or non-sensical matches
        if not file_path:
            continue

        print(f"-> Creating file: {file_path}")

        try:
            directory = os.path.dirname(file_path)

            if directory:
                os.makedirs(directory, exist_ok=True)

            # Write content with consistent line endings
            with open(file_path, 'w', encoding='utf-8', newline='\n') as f:
                f.write(code_content.strip()) # Using strip() to remove leading/trailing whitespace

            created_files_count += 1

        except Exception as e:
            print(f"   [ERROR] Failed to create file {file_path}: {e}")

    print(f"\n✅ Project generation complete. {created_files_count} files created successfully.")
    print("Abnormal files like 'Java', 'UI', 'V3.0' should no longer be created.")

if __name__ == "__main__":
    # Ensure this file contains the full, combined output from the AI.
    input_filename = "01base.md"
    create_project_from_ai_output(input_filename)
