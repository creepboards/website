import sys
from components.root import root
from components.banner_page import banner_page

def main():

    r = root()
    r.state['pages'] = [banner_page() for i in range(10)]

    with open('test_output/index.html', 'w') as f:
        f.write(r.render())

    #minify output?

    return

if __name__ == "__main__":
    main()