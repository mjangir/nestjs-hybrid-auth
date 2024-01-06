from functools import reduce

# Sample array of numbers
numbers = [1, 2, 3, 4, 5]

# Define a function to add two numbers
def add(x, y):
    return x + y

# Use the reduce function to find the sum of elements in the array
result = reduce(add, numbers)

print("Sum of elements:", result)
