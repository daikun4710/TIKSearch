from flask import Flask, request

app = Flask(__name)

@app.route('/generate_sequence')
def generate_sequence():
    import random

    # 19文字のランダムな数列を生成
    random_sequence = ''.join(random.choice('0123456789') for _ in range(19))

    return random_sequence

if __name__ == '__main__':
    app.run()
