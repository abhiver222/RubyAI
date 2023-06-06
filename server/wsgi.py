import sys
import os
import nltk

# Add your project directory to the PYTHONPATH
base = os.getcwd()
project_home = f'{base}/src'
if project_home not in sys.path:
    sys.path = [project_home] + sys.path

nltk.download('punkt')

# Import the Flask app
from src.app import app

if __name__ == '__main__':
    app.run()
