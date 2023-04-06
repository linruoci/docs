---
title: 2
---


## 1.首先， 仍然是创建我们的maven程序
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1677568963033-155062af-5566-4507-919b-6edcf414e597.png#averageHue=%232e3134&clientId=u6b3be20d-0da7-4&from=paste&height=228&id=u2bd9048e&name=image.png&originHeight=228&originWidth=460&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13943&status=done&style=none&taskId=u2ef13486-ae1e-44b1-a5bb-a20be41ecf2&title=&width=460)
这里要注意一点的是， 需要创建我们的spring配置文件(这里建议直接存放在我们的resources目录里)
如果你是idea专业版的话， 那么你只需要在点击resources文件夹的同时， 按鼠标右键即可
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1677569068072-27dde557-2cc0-4a47-a1e7-c262289aa6e8.png#averageHue=%232c323c&clientId=u6b3be20d-0da7-4&from=paste&height=74&id=uddd599ae&name=image.png&originHeight=74&originWidth=520&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12996&status=done&style=none&taskId=ub014f841-69aa-4d18-8cb5-fb4dcc8d3a6&title=&width=520)
(这里的名字随便起都可以)。

如果不是idea专业版的话， 将下方的代码拷贝进去也可
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">


</beans>
```

要注意的是， 我在这里创建了一个User对象。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1677569177118-93b227a0-28f9-4a04-b08f-abc09713ea01.png#averageHue=%232d2f33&clientId=u6b3be20d-0da7-4&from=paste&height=140&id=ud3fa4171&name=image.png&originHeight=140&originWidth=345&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8310&status=done&style=none&taskId=u789fdbe9-9ca3-41c1-9396-a24b559420c&title=&width=345)


## 第二步， 配置我们的spring配置文件

虽然spring是一个实现了IOC思想的容器，  但是spring的配置文件里还有些东西需要我们自己写
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1677569346484-d4ee9b0b-b48d-4ee2-8fc4-13e04ddf9363.png#averageHue=%231f2023&clientId=u6b3be20d-0da7-4&from=paste&height=538&id=u09e21c0a&name=image.png&originHeight=504&originWidth=1259&originalType=binary&ratio=1&rotation=0&showTitle=false&size=58299&status=done&style=none&taskId=u07d41477-e196-4a82-808e-38002c53eea&title=&width=1344)

这里是我们配置我们User对象的一个写法， 如果需要配置其它对象也是同理。

## 3.测试代码
我们接着来测试我们按上文编写我们的代码行不行的通， 这里最简单的方法就是看我们的对象是否被创建出来。
那么在spring下我们如何获取对象呢？ 这里分为两步

- **获取我们的spring容器**
- **获取我们的bean对象**

我们一步步来。

1. 获取我们的spring容器

![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1677570390490-e97ccf2b-ac8b-4a66-8cfd-246b1e499b31.png#averageHue=%231f2124&clientId=u6b3be20d-0da7-4&from=paste&height=198&id=u18bcce59&name=image.png&originHeight=198&originWidth=996&originalType=binary&ratio=1&rotation=0&showTitle=false&size=27724&status=done&style=none&taskId=u424abf94-7779-453d-b4a4-c92fcd10441&title=&width=996)

2.  获取我们的bean对象

![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1677570561242-2696d2a0-1e97-4b85-9a96-283cc62a1355.png#averageHue=%23202226&clientId=u6b3be20d-0da7-4&from=paste&height=134&id=ucd9da84b&name=image.png&originHeight=134&originWidth=545&originalType=binary&ratio=1&rotation=0&showTitle=false&size=15209&status=done&style=none&taskId=ue4f4ffdb-176e-477c-b758-6c2d084ab19&title=&width=545)

总的测试代码:>
```java
    @Test
    public void test1(){

        //1. 获取我们的spring容器
        // 这里我们需要用到一个接口， 那就是我们的ApplicationContext。
        // ApplicationContext 也就是应用上下文， 就是我们的spring容器。
        // 它底下有很多的实现类， ClassPathXmlApplicationContext是一个实现类， 意味着我们从根目录下加载我们的spring配置文件。

        ApplicationContext context = new ClassPathXmlApplicationContext("spring.xml");

        //2. 获取我们的bean对象
        //这里面参数写我们配置的bean的id。
        Object userBean = context.getBean("userBean");
        System.out.println(userBean);

    }
```
运行结果为:>
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1677570808172-44b70b42-90dc-4d93-b777-22ac59b94307.png#averageHue=%2325272b&clientId=u6b3be20d-0da7-4&from=paste&height=149&id=uae6f34b5&name=image.png&originHeight=149&originWidth=619&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19264&status=done&style=none&taskId=u7b6e8d01-0edb-4620-91e5-56062fc04a4&title=&width=619) 
到此， 第一个spring程序已经写完，在下一篇文章我们讲介绍其中的细节。
