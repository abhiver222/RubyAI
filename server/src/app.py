from flask import Flask, request, jsonify
from tinydb import TinyDB, Query
from ruby import Ruby

app = Flask(__name__)
db = TinyDB('database.json')
ruby = Ruby(db)

@app.route('/', methods=['GET'])
@app.route('/health', methods=['GET'])
def health():
    print("health check")
    return jsonify({'message': 'Server is up and running'})

# Endpoint for storing company information
@app.route('/company_info', methods=['POST'])
def store_company_info():
    print("upsert company info")
    company_data = request.json
    id = ruby.upsert_company(company_data)
    return jsonify({'message': 'Company information stored successfully', 'company_id': id})

# Endpoint for storing job description information
@app.route('/job_description', methods=['POST'])
def store_job_description():
    print("upsert job description")
    job_data = request.json
    id = ruby.upsert_job(job_data)
    return jsonify({'message': 'Job description stored successfully', 'job_id': id})

@app.route('/generate_emails', methods=['POST'])
def generate_emails():
    generate_data = request.json
    emails = ruby.generate_emails(generate_data)
    print(emails)
    return jsonify({'message': 'generated emails successfully'})


@app.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    job_data = request.json
    db.insert(job_data)
    return jsonify({'message': 'Job description information stored successfully'})

if __name__ == '__main__':
    app.run()