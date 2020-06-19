# GitHub Questions

1. What command do you use to setup a git repository inside of your folder?
    - git init
1. What command do you use to ask git to start tracking a file?
    - git add 
1. What command do you use to ask git to move your file from the staging area to the repository?
    - git push
1. What command do you use to get updates from the class repository?
    - git pull
1. What command do you use to push your work to your fork of the class repository?
    - git push
1. What command do you use to unstage a file?
    - git rm or git reset (git rm unstages AND deletes the file, git reset just unstages)
1. What command do you use to change your files back to how they were after a commit?
    - git checkout -- filename or git reset or git revert
1. Why is it important to use -- when changing files back to a previous state?
    - git checkout also switches between branches, but the -- flag denotes we want to change a file, not specifying a branch
1. Why might you want to reset your files back to a previous commit?
    - if a commit broke working code and you want to get back to working code, etc.
