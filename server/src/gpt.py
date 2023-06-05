import openai
import os
import concurrent.futures


def get_gpt3_completion(prompt, temperature=0.2, max_tokens=1000, num_generations=1):

    print('Sending request to GPT-3')
    openai.api_key = os.getenv('OPENAI_API_KEY')
    r = openai.Completion.create(model="text-davinci-003",
                                 temperature=temperature,
                                 n=num_generations,
                                 max_tokens=max_tokens,
                                 prompt=prompt
                                 )

    answer = [choice['text'].strip() for choice in r.choices]
    return answer

def get_chatgpt_completion(system_prompt, chat_prompt, temperature=0.2, num_generations=1, max_tokens=1000):
    chat_messages = create_chat_prompt(system_prompt, chat_prompt)
    openai.api_key = os.getenv('OPENAI_API_KEY')
    print('Sending request to GPT-3.5')
    r = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                    messages=chat_messages,
                                    temperature=temperature,
                                    n=num_generations,
                                    max_tokens=max_tokens)
    answer = [choice["message"]["content"].strip() for choice in r.choices]
    return answer 

def get_chatgpt_completions_parallel(system_prompt, chat_prompt, temperature=0.2, num_generations=1, max_tokens=1000):
    chat_messages = create_chat_prompt(system_prompt, chat_prompt)
    openai.api_key = os.getenv('OPENAI_API_KEY')
    print('Sending requests to GPT-3.5 in parallel')

    def call_api():
        r = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                         messages=chat_messages,
                                         temperature=temperature,
                                         n=1,
                                         max_tokens=max_tokens)
        return r.choices[0]["message"]["content"].strip()

    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(call_api) for _ in range(num_generations)]
        results = [future.result() for future in concurrent.futures.as_completed(futures)]

    return results

def get_gpt4_completion(system_prompt, chat_prompt, temperature=0.2, num_generations=1, max_tokens=1000):
    chat_messages = create_chat_prompt(system_prompt, chat_prompt)
    openai.api_key = os.getenv('OPENAI_API_KEY')
    print('Sending request to GPT-4')
    r = openai.ChatCompletion.create(model="gpt-4",
                                    messages=chat_messages,
                                    temperature=temperature,
                                    n=num_generations,
                                    max_tokens=max_tokens)
    answer = [choice["message"]["content"].strip() for choice in r.choices]
    return answer

def create_chat_prompt(system_prompt, chat_prompt):
    return [{
      "role": "system",
      "content": system_prompt
    }, {
      "role": "user",
      "content": chat_prompt
    }]