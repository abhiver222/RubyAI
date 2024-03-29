from flask import Flask, request, jsonify
from tinydb import TinyDB, Query
from ruby import Ruby
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
db = TinyDB('database.json')
ruby = Ruby(db)

@app.route('/', methods=['GET'])
@app.route('/health', methods=['GET'])
def health():
    print("health check")
    return jsonify({'message': 'Server is up and running'})

@app.route('/save_company_info', methods=['POST'])
def store_company_info():
    company_data = request.json
    print("upsert company info", company_data)
    id = ruby.upsert_company(company_data)
    return jsonify({'message': 'Company information stored successfully', 'company_id': id})

@app.route('/get_company_info', methods=['GET'])
def get_company_info():
    print("getting company info")
    info = ruby.get_company_info()
    return jsonify({'message': 'Company info fetched successfully', 'company_info': info}), 200

@app.route('/save_job_description', methods=['POST'])
def store_job_description():
    job_data = request.json
    print("upsert job description", job_data)
    id = ruby.upsert_job(job_data)
    return jsonify({'message': 'Job description stored successfully', 'job_id': id})

@app.route('/get_job_description', methods=['GET'])
def get_job_description():
    print("getting job description")
    job_description = ruby.get_job_description()
    return jsonify({'message': 'Job description stored successfully', 'job_description': job_description}), 200

@app.route('/generate_messages', methods=['POST'])
def generate_messages():
    generate_data = request.json
    print("generate messages", generate_data)
    messageData, resp_message = ruby.generate_messages(generate_data)
    if not messageData:
        return jsonify({'message': resp_message}), 400
    print(messageData)
    medium = generate_data['medium']
    return jsonify({'message': resp_message, 'messageData': messageData, 'medium': medium}), 200


@app.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    feedback_data = request.json
    print("submit feedback", feedback_data)
    message_id = ruby.insert_feedback(feedback_data)
    if not message_id:
        return jsonify({'message': 'Feedback failed to store'}), 400
    return jsonify({'message': 'Feedback stored successfully', 'message_id': message_id}), 200

@app.route('/send_message', methods=['POST'])
def send_message():
    message_data = request.json
    print("send message", message_data)
    message_id = ruby.send_message(message_data)
    if not message_id:
        return jsonify({'message': 'Message failed to send'}), 400
    return jsonify({'message': 'Message sent successfully', 'message_id': message_id}), 200

@app.route('/get_all_messages', methods=['GET'])
def get_messages_and_feedback():
    # get all generated messages
    print("getting all messages")
    messages = ruby.get_messages()
    if not messages:
        return jsonify({'message': 'Messages failed to fetch'}), 400
    return jsonify({'message': 'Messages fetched', 'messages': messages}), 200

@app.route('/generate_company_voice', methods=['POST'])
def generate_company_voice():
    print("generating company voice")
    context = request.json
    company_voice = ruby.generate_company_voice(context)
    if not company_voice:
        return jsonify({'message': 'Company voice generation failed'}), 400
    return jsonify({'message': 'Company voice generated', 'company_voice': company_voice}), 200

if __name__ == '__main__':
    app.run()