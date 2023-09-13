# 서버구축

---

우분투 서버 18.04.6 버전 이용

고정ip 설치시 설정, ssh 설치

설치후

sudo passwd root (루트계정 활성화)

sudo apt get update

sudo apt dist-upgrade

sudo timedatectl set-timezone Asia/Seoul (서울로 시간변경)

apt-get install vim

apt-get install apache2

systemctl status apache2 (아파치 동작 확인)

ip address → 첫 주소로 다른 컴퓨터에서 접속후 

![Untitled](https://github.com/UmPage/CACPage/assets/31699375/48c866c8-35a3-48ea-a14b-465b41b8d67c)

화면 나오면 성공

sudo apt update

sudo apt install openjdk-11-jdk-headless (자바 설치)

이후 java -version 혹은 javac -version 으로 확인

환경 변수 설정 ([https://goyunji.tistory.com/91](https://goyunji.tistory.com/91) 참고)

sudo apt install tomcat9

sudo service tomcat9 start

service tomcat9 status

타 컴퓨터에서 IP주소:8080 으로 접속 후

![1](https://github.com/UmPage/CACPage/assets/31699375/348c3a96-2010-4bc0-a676-b8a235e2785a)

화면 나오면 성공

sudo apt install libapache2-mod-jk ([https://passing-story.tistory.com/entry/Linux-우분투-apache2-tomcat9-연동-Ubuntu-apache2-tomcat9-연동](https://passing-story.tistory.com/entry/Linux-%EC%9A%B0%EB%B6%84%ED%88%AC-apache2-tomcat9-%EC%97%B0%EB%8F%99-Ubuntu-apache2-tomcat9-%EC%97%B0%EB%8F%99) 참고)

sudo vim /etc/libapache2-mod-jk/workers.properties 에서

workers.tomcat_home=/usr/share/**tomcat9**
workers.java_home=**/usr/lib/jvm/java-11-openjdk-amd64 수정**

sudo vi /etc/apache2/sites-available/000-default.conf

에서 기본 DocumentRoot 주석처리후

DocumentRoot /var/lib/tomcat9/webapps/ROOT
JkMount /* ajp13_worker 입력

sudo vim /etc/tomcat9/server.xml

에서 주석제거(사이트 참조)

sudo service apache2 restart

sudo service tomcat9 restart

![2](https://github.com/UmPage/CACPage/assets/31699375/e7c63027-5cc4-44a4-a5f5-453b5ad592cd)

IP주소 뒤 :8080 붙이지 않아도 톰캣화면 출력

포트포워딩과 ddns 설정(iptime 공유기, [https://ckdals29672.tistory.com/5](https://chung-develop.tistory.com/59) 참고)

[http://cac.iptime.org:8080/](http://cac.iptime.org:8080/) 입력시 = 117.16.21.52:8080 과 동일

![3](https://github.com/UmPage/CACPage/assets/31699375/d4761225-7729-4382-be23-ea4c35ffe8fd)

화면 출력 성공

다른 컴퓨터에 putty 설치 (공인 117.16.21.52 / 내부 192.168.0.19)

sudo apt-get install ssh

sudo apt-get install openssh-server

service ssh status

vi /etc/ssh/sshd_config → Port 22를 다른 번호로 변경(22000)

service ssh restart

sudo apt-get install ufw

sudo ufw status verbose

sudo ufw allow 22000

sudo ufw allow 80

sudo ufw allow 8080

sudo ufw enable

이후 putty 에서 내부ip로 추가 후 접속

cat /proc/cpuinfo 로 확인

- WOL기능 설정 (34-97-F6-33-86-9D)  ([https://velog.io/@deogicorgi/우분투Ubuntu-홈서버-구축기1-WOL-설정](https://velog.io/@deogicorgi/%EC%9A%B0%EB%B6%84%ED%88%ACUbuntu-%ED%99%88%EC%84%9C%EB%B2%84-%EA%B5%AC%EC%B6%95%EA%B8%B01-WOL-%EC%84%A4%EC%A0%95) 참고)

sudo apt-get install net-tools ethtool wakeonlan

ifconfig 로 현재 net이름 확인 → enp3s0

sudo ethtool -s enp3s0 wol g

sudo ethtool enp3s0

sudo vim /etc/network/interfaces 에서

```bash
post-up /sbin/ethtool -s enp2s0 wol g
post-down /sbin/ethtool -s enp2s0 wol g
```

추가

sudo vim /etc/netplan/00-installer-config.yaml 에서

넷카드 아래에 wakeonlan: true 추가

sudo netplan apply

iptime 설정 바꾸기, 바이오스 설정 바꾸기

putty 에서 전역ip로 설정 후 접속 테스트(외부망) + iptime 설정 포트포워딩 22000 포트 뚫기

![4](https://github.com/UmPage/CACPage/assets/31699375/142b903a-a009-4cf3-a235-68f1f2dfdc10)

공유기 원격관리 포트 뚫기(enable) 이후 외부망으로 공유기 관리페이지 접속 → WOL 기능 실험 → putty 접속 실험

![5](https://github.com/UmPage/CACPage/assets/31699375/3560204a-0804-4011-b01a-1ebd6c76028d)

- MySQL 설치 및 설정 (DB)

[https://soulduse.tistory.com/28](https://soulduse.tistory.com/28)

[http://booolean.tistory.com/366](http://booolean.tistory.com/366)

[https://luminitworld.tistory.com/82](https://luminitworld.tistory.com/82)

apt-get install mysql-server mysql-client

apt-get install wine-stable

reboot

mysql -u root -p

mysql -h 192.168.115.207 -P 3306 -u root -p

use mysql

apt-get install heidisql

- 도커 설정

[https://ckdals29672.tistory.com/10](https://ckdals29672.tistory.com/10)

- 생활코딩 웹 수업

[https://opentutorials.org/course/3084](https://opentutorials.org/course/3084)
