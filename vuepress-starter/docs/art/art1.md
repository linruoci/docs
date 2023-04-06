---
title: 1
---
上文我们已经讲过控制反转思想， 本文我们将重点来讲述它是如何实现的。

首先要知道的是， **我们的spring框架是实现了IOC思想的一个容器。**
也就是说， 如果实现了我们的spring容器 

- spring容器帮我们创建对象
- spring容器帮我们维护对象之间的关系

控制反转的实现方式有多种， 其中比较重要的，** 是我们的依赖注入(Dependency Injection) 简称DI**

依赖注入有两种方式可以实现:>

- set方法注入
- 构造方法注入

首先我们来看我们的set方法注入

### set注入
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1677561532514-2093e420-e779-4b12-a50e-fb9db57f1c0a.png#averageHue=%23222327&clientId=u3017b50c-2c82-4&from=paste&height=145&id=u2841c554&name=image.png&originHeight=145&originWidth=528&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12486&status=done&style=none&taskId=uadda4e7b-a581-4b01-b0c1-ea289ed90d1&title=&width=528)
set方法注入指的是通过我们的set方法来对我们的属性进行赋值， 这是依赖注入的第一种方式。 

### 构造方法注入
构造方法注入顾名思义， 就是通过我们的类的构造方法来对我们的属性进行赋值
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1677561602624-1ae963f9-c3e2-4c01-a803-955932a22d44.png#averageHue=%23202125&clientId=u3017b50c-2c82-4&from=paste&height=93&id=u77156087&name=image.png&originHeight=93&originWidth=502&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10112&status=done&style=none&taskId=ue3f43384-52a2-4b8c-9c20-8644db9f927&title=&width=502)
这也是我们依赖注入的第二种方式。

此外， 如果我们把依赖注入两个字拆分来看的话， 他们分别代表着:>

- **依赖： A对象和B对象之间的关系**
- **注入： 通过我们的某种手段， 可以让A对象和B对象之间产生某种关系。**
