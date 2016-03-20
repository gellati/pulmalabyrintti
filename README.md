# Number composition -game
This is a simple javascript game that works as an example in **ViLLE Edugame Hackathon 2016** and is the basis for theming competition. 

To get started, clone this project and change the remote to use your own git account. 
```
git clone https://github.com/changty/number-composition.git
cd number-composition
git remote set-url origin https://github.com/USERNAME/OTHERREPOSITORY.git
```

Verify changes: 
```
git remote -v
```

## Game logic
The player tries to get the target value shown on the play area using numbers given in options. There operation to combine numbers can be addition, subtraction, division or multiplication. That is defined separately in each problem in the dataset.

If the player gets a correct answer, the answer is saved via "sendAnswer"-function and the player is presented with next problem or game over screen, if the player is out of questoins. 

In addition and multiplication, the player gets a wrong answer, if the combined value is bigger than the target value. In division and subtraction the player gets wrong answer, if the answer is smaller than the target value.


## Good resources for learning CSS
*[CSS3 Cheat sheet](http://www.lesliefranke.com/files/reference/csscheatsheet.html)
*[W3Schools](http://www.w3schools.com/css/) Lots of examples  
