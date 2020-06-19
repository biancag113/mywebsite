while True:

  color = input('Enter "green", "yellow", "red", or "quit": ').lower()
  print(f'The user entered {color}')

  if color == 'quit':
    break
  elif color == 'green':
    print('Go!')
  elif color == 'yellow':
    print('Slow Down!')
  elif color == 'red':
    print('Stop!')
  else:
    print('Bogus!')
