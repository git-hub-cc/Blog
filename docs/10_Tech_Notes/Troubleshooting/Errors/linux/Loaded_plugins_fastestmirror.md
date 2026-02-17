一、centos7修改源
在CentOS 7中，修改系统软件源可以通过编辑/etc/yum.repos.d/目录下的.repo文件来实现。以下是一个基本的步骤和示例代码，用于将默认的软件源修改为阿里云的源。
备份当前的CentOS-Base.repo文件：

sudo cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup

下载阿里云的CentOS源配置文件：

sudo wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

清除缓存并生成新的缓存：

sudo yum clean all
sudo yum makecache

以上步骤将会将系统的软件源修改为阿里云的源，并更新缓存。你可以根据需要将上述的阿里云源地址换成其他的源地址。

二、常用Linux的国内源
Centos
中国软件科学院研究所
https://mirror.iscas.ac.cn/centos/
校园联合镜像源
https://help.mirrors.cernet.edu.cn/centos/
清华大学源
https://mirrors.tuna.tsinghua.edu.cn/help/centos/
中科大源
https://mirrors.ustc.edu.cn/help/centos.html
上海交通大学源
https://mirrors.sjtug.sjtu.edu.cn/docs/centos
北京交通大学源
https://mirror.bjtu.edu.cn/help/centos/
阿里源
https://developer.aliyun.com/mirror/centos
epel源(Centos企业源)
中国软件科学院研究所
https://mirror.iscas.ac.cn/epel/
校园联合镜像源
https://help.mirrors.cernet.edu.cn/epel/
清华大学源
https://mirrors.tuna.tsinghua.edu.cn/help/epel/
中科大源
https://mirrors.ustc.edu.cn/help/epel.html
阿里源
https://developer.aliyun.com/mirror/epel
Ubuntu
中国软件科学院研究所
https://mirror.iscas.ac.cn/ubuntu/
校园联合镜像源
https://help.mirrors.cernet.edu.cn/ubuntu/
清华大学源
https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/
中科大源
https://mirrors.ustc.edu.cn/help/ubuntu.html
阿里源
https://developer.aliyun.com/mirror/ubuntu
上海交通大学源
https://mirrors.sjtug.sjtu.edu.cn/docs/ubuntu
北京交通大学源
https://mirror.bjtu.edu.cn/help/ubuntu/
Debian
中国软件科学院研究所
https://mirror.iscas.ac.cn/debian/
校园联合镜像源
https://help.mirrors.cernet.edu.cn/debian/
清华大学源
https://mirrors.tuna.tsinghua.edu.cn/help/debian/
中科大源
https://mirrors.ustc.edu.cn/help/debiancn.html
阿里源
https://developer.aliyun.com/mirror/debian
上海交通大学源
https://mirrors.sjtug.sjtu.edu.cn/docs/debian
Proxmox(PVE)
中国软件科学院研究所
https://mirror.iscas.ac.cn/proxmox/
校园联合镜像源
https://help.mirrors.cernet.edu.cn/proxmox/
清华大学源
https://mirrors.tuna.tsinghua.edu.cn/help/proxmox/
中科大源
https://mirrors.ustc.edu.cn/help/proxmox.html
Ceph
中国软件科学院研究所
https://mirror.iscas.ac.cn/ceph/
校园联合镜像源
https://help.mirrors.cernet.edu.cn/ceph/
清华大学源
https://mirrors.tuna.tsinghua.edu.cn/ceph/
中科大源
https://mirrors.ustc.edu.cn/ceph/