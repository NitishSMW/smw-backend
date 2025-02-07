# server/aiScript.py
import sys
import json

def analyze_answers(answers):
    # Simple example: score based on correct answers
    correct_answers = {
        "q1": "A",
        "q2": "C",
        "q3": "B",
    }

    score = 0
    for question, answer in answers.items():
        if correct_answers.get(question) == answer:
            score += 1

    return {
        "score": score,
        "message": f"Your score is {score} out of {len(correct_answers)}",
    }

# Get answers passed from Node.js
answers = json.loads(sys.argv[1])

# Analyze the answers
result = analyze_answers(answers)

# Output the result in JSON format (this will be captured by Node.js)
print(json.dumps(result))
