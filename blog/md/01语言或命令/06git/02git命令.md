好的，这是一份对常用 Git 命令进行完整分类的文档。

本文档将 Git 命令按照其功能和使用场景，分为七大类，从初次设置到高级操作，帮助你系统地理解和掌握 Git。

---

### **Git 命令分类详解文档**

Git 是一个功能强大的分布式版本控制系统。为了更好地使用它，我们可以将其命令按逻辑功能进行划分。

#### **一、 初始配置与设置 (Initial Configuration & Setup)**

这类命令用于首次安装 Git 后进行全局或项目级别的配置。

| 命令 | 描述 | 常用示例 |
| :--- | :--- | :--- |
| `git config` | 配置 Git 的用户信息、别名、编辑器等。配置可分为三个级别：`--local` (项目级，默认), `--global` (用户级), `--system` (系统级)。 | `git config --global user.name "Your Name"` <br> `git config --global user.email "you@example.com"` <br> `git config --global core.editor "vim"` <br> `git config --list` (查看所有配置) |

---

#### **二、 创建与克隆仓库 (Creating & Cloning Repositories)**

这类命令用于开始一个新的 Git 项目，无论是本地创建还是从远程服务器拷贝。

| 命令 | 描述 | 常用示例 |
| :--- | :--- | :--- |
| `git init` | 在当前目录下创建一个新的、空的 Git 仓库。 | `cd my_project` <br> `git init` |
| `git clone` | 从一个远程 URL 克隆（下载）一个完整的仓库及其历史记录到本地。 | `git clone https://github.com/user/repo.git` <br> `git clone git@github.com:user/repo.git` |

---

#### **三、 日常核心工作流 (Daily Core Workflow)**

这是 Git 使用频率最高的一组命令，构成了“修改 -> 暂存 -> 提交”的基本循环。

| 命令 | 描述 | 常用示例 |
| :--- | :--- | :--- |
| `git status` | 显示工作区和暂存区的状态。能看到哪些文件被修改、哪些是新增的、哪些已暂存等。 | `git status` <br> `git status -s` (以精简格式输出) |
| `git add` | 将工作区的修改（新文件或被修改的文件）添加到暂存区（Index），准备下一次提交。 | `git add <file_name>` (添加指定文件) <br> `git add .` (添加当前目录下所有变更) <br> `git add -p` (交互式地添加部分修改) |
| `git commit` | 将暂存区的所有内容生成一个新的提交，并保存到本地仓库的历史记录中。 | `git commit -m "Your commit message"` <br> `git commit` (打开编辑器输入详细信息) <br> `git commit -am "Message"` (将已跟踪文件的修改直接暂存并提交) |
| `git diff` | 查看文件内容的具体差异。 | `git diff` (查看工作区与暂存区的差异) <br> `git diff --staged` 或 `git diff --cached` (查看暂存区与上次提交的差异) <br> `git diff HEAD` (查看工作区+暂存区与上次提交的差异) <br> `git diff <commit1> <commit2>` (比较两次提交的差异) |
| `git log` | 显示从最近到最远的提交历史记录。 | `git log` <br> `git log --oneline` (单行简洁显示) <br> `git log --graph --oneline --decorate --all` (查看所有分支的图形化历史) |
| `git rm` | 从工作区和暂存区中删除文件。 | `git rm <file_name>` <br> `git rm --cached <file_name>` (只从暂存区删除，保留工作区文件) |
| `git mv` | 重命名或移动文件，并把这个变更记录到暂存区。 | `git mv old_name.txt new_name.txt` |

---

#### **四、 分支管理 (Branching & Merging)**

分支是 Git 的核心特性，它允许你偏离主线进行开发，而不会影响主线。

| 命令 | 描述 | 常用示例 |
| :--- | :--- | :--- |
| `git branch` | 列出、创建或删除分支。 | `git branch` (列出所有本地分支) <br> `git branch -a` (列出所有本地和远程分支) <br> `git branch <branch-name>` (创建一个新分支) <br> `git branch -d <branch-name>` (删除一个已合并的分支) <br> `git branch -D <branch-name>` (强制删除一个分支) |
| `git switch` | **(推荐)** 用于切换分支。 | `git switch <branch-name>` (切换到已存在的分支) <br> `git switch -c <new-branch-name>` (创建并切换到新分支) |
| `git checkout`| **(传统)** 功能复杂，既可切换分支，也可恢复文件。 | `git checkout <branch-name>` (切换分支) <br> `git checkout -b <new-branch-name>` (创建并切换到新分支) <br> `git checkout -- <file_name>` (撤销对工作区文件的修改) |
| `git merge` | 将一个分支的修改合并到当前分支。 | `git switch main` <br> `git merge feature-branch` (将 feature-branch 合并到 main) <br> `--no-ff` (禁用 Fast-forward，保留合并的提交记录) |
| `git rebase`| “变基”，将一系列提交记录在另一分支上重放，使历史记录更线性、更整洁。 | `git switch feature-branch` <br> `git rebase main` (将 feature-branch 的基底变更为 main 的最新提交) <br> `git rebase -i <commit-hash>` (交互式变基，可用于合并、修改、重排提交) <br> **黄金法则：永远不要对已经推送到公共仓库的分支进行 rebase！** |

---

#### **五、 远程仓库与协作 (Remote Repositories & Collaboration)**

这类命令用于与远程仓库（如 GitHub, GitLab）进行交互，实现团队协作。

| 命令 | 描述 | 常用示例 |
| :--- | :--- | :--- |
| `git remote` | 管理已配置的远程仓库。 | `git remote -v` (显示所有远程仓库的 URL) <br> `git remote add <name> <url>` (添加一个新的远程仓库，通常 `name` 为 `origin`) <br> `git remote remove <name>` (移除一个远程仓库) |
| `git fetch` | 从远程仓库下载最新的对象（提交、文件、标签等），但**不**会自动合并到你当前的工作中。 | `git fetch origin` (获取 origin 远程仓库的所有更新) |
| `git pull` | 从远程仓库获取最新版本并自动合并到本地分支。它相当于 `git fetch` + `git merge`。 | `git pull origin main` (拉取 origin/main 并合并到当前分支) <br> `git pull --rebase` (使用 rebase 代替 merge 进行合并) |
| `git push` | 将本地分支的提交上传到远程仓库。 | `git push origin main` (将本地 main 分支推送到 origin 远程仓库) <br> `git push -u origin <branch-name>` (首次推送时，建立本地分支与远程分支的追踪关系) <br> `git push --force` (强制推送，**危险操作**，会覆盖远程历史) <br> `git push --force-with-lease` (更安全的强制推送) |

---

#### **六、 撤销操作与历史修改 (Undoing Changes & History Rewriting)**

当你犯了错误或需要整理历史时，这些命令会派上用场。它们中的一些是危险的，需谨慎使用。

| 命令 | 描述 | 常用示例 |
| :--- | :--- | :--- |
| `git reset` | 重置当前 HEAD 到指定状态，可以修改暂存区和工作区。 | `git reset --soft HEAD~1` (撤销上一次 commit，但保留修改在暂存区) <br> `git reset --mixed HEAD~1` (默认，撤销上一次 commit 和暂存，保留修改在工作区) <br> `git reset --hard HEAD~1` (**危险**，彻底撤销上一次 commit，工作区和暂存区的修改都会丢失) <br> `git reset <file_name>` (取消暂存某个文件) |
| `git revert` | 创建一个**新的提交**来撤销（反转）某一个历史提交的效果。这是在公共分支上安全地“撤销”操作的方式。 | `git revert <commit-hash>` |
| `git clean` | 从工作区中删除未被追踪的文件（Untracked files）。 | `git clean -n` (演习，显示将要删除的文件) <br> `git clean -f` (强制删除未追踪的文件) <br> `git clean -fd` (连同未追踪的目录一起删除) |
| `git restore`| **(推荐)** 用于恢复文件。 | `git restore <file_name>` (撤销工作区对文件的修改) <br> `git restore --staged <file_name>` (将文件从暂存区移回工作区) |

---

#### **七、 高级工具与检视 (Advanced Tools & Inspection)**

这些命令提供了更强大的功能，用于解决特定问题或优化工作流程。

| 命令 | 描述 | 常用示例 |
| :--- | :--- | :--- |
| `git stash` | 临时保存当前工作区和暂存区的修改，让工作区变干净，以便切换分支等操作。 | `git stash` 或 `git stash save "message"` (保存当前修改) <br> `git stash list` (查看所有保存的 stash) <br> `git stash pop` (恢复最近一次保存的修改，并从列表中删除) <br> `git stash apply` (恢复修改，但不从列表中删除) <br> `git stash drop` (删除一个 stash) |
| `git tag` | 为历史记录中的某个特定提交点打上标签，通常用于标记版本发布（如 v1.0）。 | `git tag v1.0.0` (创建轻量标签) <br> `git tag -a v1.0.0 -m "Version 1.0.0 release"` (创建带附注的标签) <br> `git push origin --tags` (将所有本地标签推送到远程) |
| `git reflog` | 显示 HEAD 和分支引用的所有历史操作记录。是你的“后悔药”，可以帮你找回丢失的提交（例如在 `reset --hard` 之后）。 | `git reflog` |
| `git bisect` | 使用二分查找法在提交历史中快速定位引入 bug 的那一次提交。 | `git bisect start` <br> `git bisect bad` (标记当前提交有问题) <br> `git bisect good <commit-hash>` (标记某个历史提交是好的) <br> ... (Git 会自动切换提交，你只需测试并告知 `good` 或 `bad`) <br> `git bisect reset` (结束查找) |
| `git cherry-pick` | "拣选" 一个或多个来自其他分支的提交，并将其应用到当前分支。 | `git cherry-pick <commit-hash>` |