class component():

    def __init__(self) -> None:
        self.state = {}
        pass

    def get_snippet(self, path):
        with open(path, encoding="utf8") as f:
            return f.read()