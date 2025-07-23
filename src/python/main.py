import runpy
import os

os.environ["EXAMPLE"] = "example_0.py" # default value
example_name = os.environ.get("EXAMPLE")

if not example_name:
    AssertionError("EXAMPLE environment variable not set.")

filename = f"{os.getenv("REPL_HOME")}/src/python/examples/{example_name}"
if filename:
    print(f"\nStrting {filename}...\n")
    runpy.run_path(filename, run_name="__main__")
else:
    print("Invalid example file.")
