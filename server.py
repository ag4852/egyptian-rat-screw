from flask import Flask, jsonify, request
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

user_data = {
    'questions_wrong': 0,
    'learn_page_timestamp': None,
    'current_slide': 0,
    'previously_visited': set()
}

quiz_data = {
    'difficulty': None,
    'results': []
}

@app.route('/api/update_progress', methods=['POST'])
def update_progress():
    data = request.json
    
    # add to previously visited if is_correct is provided (meaning check button was clicked)
    if 'is_correct' in data and data['is_correct'] is not None:
        user_data['previously_visited'].add(user_data['current_slide'])
    
    # update current slide
    user_data['current_slide'] = data['current_slide']
    
    # update timestamp on first visit
    if user_data['learn_page_timestamp'] is None:
        user_data['learn_page_timestamp'] = datetime.now().isoformat()
    
    # update wrong questions count if provided and incorrect
    if 'is_correct' in data and data['is_correct'] is False:
        user_data['questions_wrong'] += 1
    
    print(user_data['questions_wrong'])
    return jsonify({
        'success': True,
        'user_data': {
            'questions_wrong': user_data['questions_wrong'],
            'learn_page_timestamp': user_data['learn_page_timestamp'],
            'current_slide': user_data['current_slide'],
            'previously_visited': list(user_data['previously_visited'])
        }
    })

@app.route('/api/get_progress', methods=['GET'])
def get_progress():
    response_data = user_data.copy()
    response_data['previously_visited'] = list(user_data['previously_visited'])
    return jsonify(response_data)

@app.route('/api/quiz-results', methods=['POST'])
def save_quiz_results():
    data = request.json
    
    # update the quiz_data variable
    quiz_data['difficulty'] = data.get('difficulty')
    quiz_data['results'] = data.get('results', [])
    print(quiz_data)
    
    return jsonify({'success': True, 'message': 'Quiz results saved'})

@app.route('/api/get-quiz-results', methods=['GET'])
def get_quiz_results():
    return jsonify(quiz_data)

if __name__ == '__main__':
    app.run(debug=True, port=5001) 
