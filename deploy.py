import subprocess
import os
import re

for i in range(1, 5):
    path = f"/Users/astitwa/Desktop/resume/SCT_WD_{i}"
    print(f"Deploying SCT_WD_{i}...")
    
    project_name = f"sct-wd-{i}"
    # Run vercel deploy
    result = subprocess.run(["vercel", "--prod", "--yes", "--name", project_name], cwd=path, capture_output=True, text=True)
    
    url = None
    # Search stdout and stderr for the vercel URL
    combined_output = result.stdout + "\n" + result.stderr
    
    match = re.search(r'(https://[a-zA-Z0-9-]+\.vercel\.app)', combined_output)
    if match:
        url = match.group(1)

    if url:
        print(f"Deployed SCT_WD_{i} to {url}")
        
        # Update README
        readme_path = os.path.join(path, "README.md")
        if os.path.exists(readme_path):
            with open(readme_path, "r") as f:
                content = f.read()
            
            content = content.replace("[Insert Live Deployment Link Here]", url)
            
            with open(readme_path, "w") as f:
                f.write(content)
                
            # Git commit and push
            subprocess.run(["git", "add", "README.md"], cwd=path, capture_output=True)
            subprocess.run(["git", "commit", "-m", "Add Vercel live deployment link"], cwd=path, capture_output=True)
            subprocess.run(["git", "push"], cwd=path, capture_output=True)
            print(f"Pushed updated README for SCT_WD_{i}")
    else:
        print(f"Failed to extract URL for SCT_WD_{i}. Output:\n{combined_output}")
