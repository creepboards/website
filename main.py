import sys
from components.root import root
from components.page import page

def main():

    r = root()
    r.state['pages'] = [page() for i in range(10)]

    with open('test_output/index.html', 'w') as f:
        f.write(r.render())

    #minify output?

    return

if __name__ == "__main__":
    main()