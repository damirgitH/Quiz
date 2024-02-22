import eel
import json
import threading
import os

todo_count = 0

eel.init("web")


def read_data():
    with open("data.json", "r") as file:
        content = json.loads(file.read())
    return content


def write_data(content):
    with open("data.json", "w") as file:
        file.write(json.dumps(content))
    return content


@eel.expose
def create_todo(title):
    global todo_count

    new_todo = {
        "id": todo_count + 1,
        "title": title
    }

    content = read_data()
    content['todos'].append(new_todo)

    write_data(content)
    todo_count += 1

    return new_todo


@eel.expose
def list_todo():
    return read_data()


@eel.expose
def delete_todo(id):
    global todo_count

    content = read_data()
    for todo in content['todos']:
        if todo['id'] == id:
            content['todos'].remove(todo)

    write_data(content)
    todo_count -= 1


@eel.expose
def clear_all_entries():
    write_data({"todos": []})


@eel.expose
def exit_application():
    eel.close_app()

if not os.path.exists("data.json"):
    file = open("data.json", "w")
    file.write(json.dumps({"todos": []}))
    file.close()
else:
    content = read_data()
    todo_count = len(content['todos'])

if __name__ == "__main__":
    eel.start("main.html", size=(1920, 1080), mode='chrome', port=0)
