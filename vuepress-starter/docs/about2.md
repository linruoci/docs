## 16.1 什么是面向切面编程
AOP（Aspect Oriented Programming）： 被译为面向切面编程， 面向方面编程（是一种编程思想）
那么什么是切面？
我们说， 在业务流程中与业务逻辑无关的通用的非逻辑代码， 就是我们的切面。
什么意思？
比如说， 我们在每个项目中都需要用到我们的事务代码， 事务无非分为三步， 第一步是开启事务， 第二是如果遇到异常我们就回滚事务， 第三步就是提交事务。 事务的代码永远都是这几部分。 我们把这种固定代码并且与业务逻辑不挂钩的非业务逻辑代码， 称为切面。 还有我们日志代码， 安全代码等等。举个例子:>

还记得我们当时静态代理中要统计业务方法时长的代码吗？
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679397539189-d2cc881c-2a7c-4374-90d2-0040111ead54.png#averageHue=%231f2024&clientId=u81d9f001-f9c8-4&from=paste&height=365&id=ua307ea16&name=image.png&originHeight=365&originWidth=678&originalType=binary&ratio=1&rotation=0&showTitle=false&size=39129&status=done&style=none&taskId=u284d2fdd-d537-4238-8622-6349d93fd62&title=&width=678)
这里如果我们直接在业务方法中写我们的计时代码， 不仅**代码没有得到复用， 我们的程序员也无法专注于业务代码， 因为如果在每一个业务方法都加上安全， 事务等的话， 那么代码将会变得冗余。 **
**因此， 我们提出了使用动态代理（AOP的一种实现）的方式来解决这个问题**

**我们将与业务流程无关的通用的非业务逻辑代码提取出来， 单独的放在一个类里面， 这样我们修改就只需要修改一部分， 并且代码也成功得到了复用。**
**并且， 在写业务逻辑的时候， 也不再需要考虑什么统计时长， 记录日志等系统服务。**
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679397690280-a0feeb1a-6caa-4f40-a2be-d43882ad7605.png#averageHue=%23202125&clientId=u81d9f001-f9c8-4&from=paste&height=440&id=ubbbb8e4b&name=image.png&originHeight=440&originWidth=1079&originalType=binary&ratio=1&rotation=0&showTitle=false&size=52410&status=done&style=none&taskId=u260203fb-e0be-41b4-b9d8-1b885f9fab6&title=&width=1079)

看看下图， 描绘了AOP的一个场景:
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679398320719-57f59ec1-5f1b-46c2-9e08-96fdf5c0dcac.png#averageHue=%23daf1ee&clientId=u81d9f001-f9c8-4&from=paste&height=543&id=u09ce5f35&name=image.png&originHeight=543&originWidth=940&originalType=binary&ratio=1&rotation=0&showTitle=false&size=36830&status=done&style=none&taskId=u822948f2-3d45-45e5-976f-cf66795d741&title=&width=940)

这里这些绿色的都属于切面。 并且每一个都是一个单独的组件。 纵向的是我们的核心业务，这几个单独的组件需要在哪用， 直接切进去即可， 并且对三个业务方法都能起作用。
那么什么是面向切面编程呢？
**就是将我们的业务逻辑当中的非业务逻辑代码， 比如说日志模块， 事务模块， 安全模块（也被称为交叉业务）等单独提取出来， 形成一个横向的切面， 把业务逻辑看成是纵向的话， 我们以横向交叉的方式应用到业务流程当中的过程， 我们就叫AOP面向切面编程。**
我们之前写的JDK动态代理和我们的CGLIB动态代理本质上都实现了AOP。

> spring的AOP使用的动态代理是： JDK动态代理和CGLIB动态代理， 会在这两种方式中灵活切换， 当代理的类是接口时， 此时会采用JDK动态代理， 当代理类没有实现接口时， 此时会采用CGLIB动态代理， 当然， 我们也可以通过配置强制spring使用CGLIB动态代理



## 16.2 AOP当中的几个重要术语
请看下面这个代码:
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679498145806-e980c03a-2aa1-45f2-8b2c-72840bc8af6c.png#averageHue=%23282d36&clientId=u2c980ae8-bea7-4&from=paste&height=712&id=ub2d4d90b&name=image.png&originHeight=712&originWidth=823&originalType=binary&ratio=1&rotation=0&showTitle=false&size=74075&status=done&style=none&taskId=u09229b7f-0000-4d76-9fea-68ff2a6fbd6&title=&width=823)

- Joinpoint 连接点

 	joinPoint 在这里描述的是位置的一个概念， 指我们能织入切面的位置。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679498316666-a1e5c98b-7eec-44a2-a93a-6857332be452.png#averageHue=%23292d36&clientId=u2c980ae8-bea7-4&from=paste&height=419&id=u6f5b1115&name=image.png&originHeight=419&originWidth=506&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34239&status=done&style=none&taskId=u6c722965-8478-4d1c-a663-ee4a08570cc&title=&width=506)
在我们的方法前后都是可以织入切面的位置，   在我们的catch语句中， 我们的finally语句中， 都是可以织入切面的位置。

- Pointcut 切点

切点是我们织入切面的方法， **本质上就是方法调用的位置**。 比如说， 在这里， do1()等方法就是我们的切点。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679498833014-7923e5bf-09f2-485a-bff7-dd10cf01c010.png#averageHue=%23292e37&clientId=u2c980ae8-bea7-4&from=paste&height=386&id=u6f5237db&name=image.png&originHeight=386&originWidth=542&originalType=binary&ratio=1&rotation=0&showTitle=false&size=40294&status=done&style=none&taskId=u1e5c5231-b07c-4dbc-96a5-b6e499e0146&title=&width=542)
       

- Advice 通知 

**通知又叫增强， 就是具体我们要织入的代码**
**举个例子:**
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679499154940-562693a3-dc09-4606-ae31-0e1a24c27ed2.png#averageHue=%23202226&clientId=u94072710-8d60-4&from=paste&height=375&id=u7cfde941&name=image.png&originHeight=375&originWidth=958&originalType=binary&ratio=1&rotation=0&showTitle=false&size=42582&status=done&style=none&taskId=u4e7e1380-e5c2-4bd1-aa05-a40ccbb4115&title=&width=958)
在上一章我们的代理模式中， 这里我们写的这些统计业务耗时的代码， 就是通知。
通知又分为以下几种:> 
   1. 前置通知
   2. 后置通知
   3. 环绕通知
   4. 异常通知
   5. 最终通知 
还是举个例子:>
前置通知
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679499391428-9c8f1419-1745-4ea1-b821-c5fdbc18820a.png#averageHue=%232a2f38&clientId=u94072710-8d60-4&from=paste&height=111&id=uee14e0bb&name=image.png&originHeight=111&originWidth=651&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8685&status=done&style=none&taskId=u160911c0-e116-49a4-876d-74df63d5e63&title=&width=651)

后置通知
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679499418618-19ef085a-23d9-48a8-93d1-c647cfd15aab.png#averageHue=%232a2f37&clientId=u94072710-8d60-4&from=paste&height=76&id=u1e9395f5&name=image.png&originHeight=76&originWidth=759&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8160&status=done&style=none&taskId=u18abeaca-5b88-42df-a89a-de2ef0bed67&title=&width=759)

如果调用方法的前后都有增强代码， 那么这就是环绕通知。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679499456846-a291076c-44ee-42b6-96c5-48221a70f3c3.png#averageHue=%232b2f39&clientId=u94072710-8d60-4&from=paste&height=100&id=u7e1fa536&name=image.png&originHeight=100&originWidth=383&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7519&status=done&style=none&taskId=u764b1575-73b7-450f-921f-8044acb0fbb&title=&width=383)

异常通知， 发生在异常抛出之后的通知
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679499506385-3909b84d-e920-47b7-b552-f090238e0d7a.png#averageHue=%23292d36&clientId=u94072710-8d60-4&from=paste&height=140&id=ufe1402a6&name=image.png&originHeight=140&originWidth=501&originalType=binary&ratio=1&rotation=0&showTitle=false&size=9266&status=done&style=none&taskId=u07e78a11-24ba-452f-9f08-6a7a62896c4&title=&width=501)

最终通知， 发生在我们的方法执行过后~
但与后置通知不同的是， 如果方法内部发生异常， 后置通知不会执行， 但最终通知怎样都会执行。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679499545477-f3e922a8-a79e-47ef-aa88-232257cf56ec.png#averageHue=%23292d36&clientId=u94072710-8d60-4&from=paste&height=151&id=ua0c0795d&name=image.png&originHeight=151&originWidth=443&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5776&status=done&style=none&taskId=u53ce31f5-b7d3-45c7-ab5e-42154773306&title=&width=443)

-  切面Aspect

** 切点+通知就是我们的切面**
 这里说一下我自己的理解:>
我们在上一节中， 曾自己手写了一个jdk动态代理的代码， 我们实现了一个InvocationHandler接口， 同时我们需要重写invoke()方法， 并且我们在invoke方法里写了我们的增强代码， 但同时在这个方法里，** 我们也同样需要调用我们目标对象的目标方法**
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679499938201-5c2437ae-89e5-47ab-b9c1-44ea0e5339ae.png#averageHue=%23202125&clientId=u94072710-8d60-4&from=paste&height=233&id=u7b1449a6&name=image.png&originHeight=233&originWidth=890&originalType=binary&ratio=1&rotation=0&showTitle=false&size=39621&status=done&style=none&taskId=u6eca9629-0436-4cc4-9460-0246aba5316&title=&width=890)
在这里面既有我们的切点也有我们的增强代码， 因此其实这个invoke()方法就是一个切面， 并且是一个统计业务耗时的一个单独的组件。

- 织入 Weaving

织入就是指将我们的切面应用到我们的目标对象的一个过程。

- 目标对象

被织入通知的对象（其实就是我们需要增强的对象）

- 代理对象

代理对象就是指一个对象被织入通知后产生的新对象~

## 16.3 切点表达式
**切点表达式用来定义我们的通知要在哪些方法上织入。**
切点表达式语法:>
```
execution([访问修饰限定符] 返回值 [全限定类名]方法名(形式参数列表)[异常])
```

> 这里我们可以这么记:>
> 我们定义方法的时候不也是通过这种方式来定义的吗？
> 比如:
> public void insert throws Exception(String username){}
> 先是我们的访问修饰限定符， 接着就是我们的返回值类型， 接着是我们的方法名（在切点表达式中需要加上我们全限定类名）， 接着是参数列表， 再接着就是我们的异常。

访问修饰限定符

- 可选项
- 没写就代表着什么返回类型都可以
- 写public就代表着只包括公开的方法

返回值类型

- 必填项
- * 号表示返回值类型任意

全限定类名

- 可选项
- 两个点 ".." 代表当前包以及子包下的所有类
- 省略时表示所有的类。

方法名

- 必填项
- *表示所有方法
- delete*表示所有以delete开头的方法

形式参数列表

- 必填项
- （）表示没有参数的方法
- （*） 代表一个参数的方法
- （..）代表任意参数的方法
- （*， String）第一个参数类型任意， 但第二个参数是String的方法。

异常

- 可省略
- 省略时表示任意异常类型

举个例子:>
```
execution(public * com.powernode.mall.service.*.delete*(..))
```
这里表示service包下(不包括子包)的所有类的public权限的任意参数的delete方法。

```
execution(* com.powernode.mall..*(..))
```
这里表示mall包下所有的类的所有的方法。

```
execution（* *(..)）
```
这里表示所有类的所有方法

---

了解了这些之后， 接着我们可以重点来使用Spring的AOP了

## 16.4 使用Spring的AOP
Spring对AOP的实现包括以下三种方式:>

- 第一：**Spring框架结合AspectJ框架实现的AOP， 采用注解形式**
- 第二：Spring框架结合AspectJ框架实现的AOP， 采用xml文件形式
- 第三：Spring使用自己实现的AOP， 基于XML文件

在这里我们重点讲解第一种形式， 因为在实际开发中都是采用Spring+AspectJ的形式， 并且基于注解形式。

### 16.4.1 准备工作：
首先需要引入下面依赖:>
```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.3.24</version>
</dependency>

<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aop</artifactId>
    <version>5.3.24</version>
</dependency>

<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
    <version>5.2.3.RELEASE</version>
</dependency>
```

接着在我们spring的配置文件中， 需要引入下方命名空间:>
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
```

### 基于AspectJ的Spring AOP开发
首先还是新建一个类~ 这里我们需要将其纳入spring管理， 加上注解即可。
下面就是我们要增强的类和方法~
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679532799228-1fa3a198-a210-4b40-b37c-3fdccba76015.png#averageHue=%231f2124&clientId=u9ce5bed2-7791-4&from=paste&height=406&id=uf6ee514b&name=image.png&originHeight=507&originWidth=953&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=51419&status=done&style=none&taskId=u2cc3d27e-bc76-4129-a008-3a0d9d0971d&title=&width=762.4)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679537305591-66787686-f736-477b-b623-122fb9cdead5.png#averageHue=%231f2124&clientId=u69cae73d-8d23-4&from=paste&height=472&id=uc8cb0045&name=image.png&originHeight=590&originWidth=571&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=48739&status=done&style=none&taskId=u9bac1216-5e8a-4f63-9086-9d83e589c56&title=&width=456.8)

接着我们需要定义我们的切面类。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679532987365-93f5b153-6c0e-4ed8-9e2b-10e2f32a134d.png#averageHue=%23202125&clientId=u9ce5bed2-7791-4&from=paste&height=554&id=ubd728d6c&name=image.png&originHeight=692&originWidth=814&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=88135&status=done&style=none&taskId=ua511fa9d-9d19-4766-84f6-c5cebb434c9&title=&width=651.2)
这里的before就是我们的增强代码（即通知）， 切点表达式就是我们要织入的方法(定义切点), 通知+切点构成了我们的切面。
这里的@Before注解 代表着前置通知。 在方法执行前执行。

配置文件:>
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679536723275-1ea3c847-1e4e-41cf-a2c4-99141c9b4a16.png#averageHue=%231f2124&clientId=u69cae73d-8d23-4&from=paste&height=374&id=u22b2843d&name=image.png&originHeight=468&originWidth=1662&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=106880&status=done&style=none&taskId=u7ac40a5c-ef7c-4654-96e3-5b7a45b2579&title=&width=1329.6)
开启<aop:aspectj-autoproxy>之后， 凡是带有@Aspect注解的类， Spring都会自动为目标类生成代理类。
此外， <aop:aspectj-autoproxy>还有其他属性:
proxy-target-class属性:
默认值为false， 意为默认使用JDK动态代理， 当类没有实现接口时，  使用cglib动态代理。
当值为true时， 强制使用CGLIB动态代理。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679536819017-67979540-26c2-4528-b393-617135d6e35a.png#averageHue=%23222326&clientId=u69cae73d-8d23-4&from=paste&height=85&id=u66a763c5&name=image.png&originHeight=106&originWidth=722&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=11076&status=done&style=none&taskId=u4e205d7e-7818-4de3-9ef4-2b14c9003c3&title=&width=577.6)

测试程序:>
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679537347325-10141454-3b35-42a3-90df-6d38ff1e22f9.png#averageHue=%23212226&clientId=u69cae73d-8d23-4&from=paste&height=362&id=ua864e545&name=image.png&originHeight=453&originWidth=1238&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=59176&status=done&style=none&taskId=ucf233214-485f-4307-982d-4ef1cb51ba7&title=&width=990.4)

运行结果:>
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679537395773-daee98f7-8b67-421d-93a0-af7cfedd11d3.png#averageHue=%23232529&clientId=u69cae73d-8d23-4&from=paste&height=182&id=uc32dd389&name=image.png&originHeight=227&originWidth=524&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=25184&status=done&style=none&taskId=u077298cc-dd48-457c-a1df-d9c9a03cb3d&title=&width=419.2)

## 16.5 各种通知类型
通知的类型及其对应的注解:

- 前置通知: @Before
- 后置通知: @AfterReturning(**注意这里是AfterReturning不是After！！！！**)
- 环绕通知: @Around
- 异常通知: @AfterThrowing
- 最终通知: @After

请看下面的例子~
前置通知， 即在方法的执行前执行的通知， 后置通知也是同理， 是在方法执行后的通知~
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679555657866-ad8292ba-5e32-455a-848e-e360e6e616cd.png#averageHue=%23202226&clientId=u09d8e2a7-0368-4&from=paste&height=221&id=ue665052a&name=image.png&originHeight=276&originWidth=952&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=53708&status=done&style=none&taskId=u130e8b57-57ab-4b43-9507-18499c4880f&title=&width=761.6)

测试程序:>
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679555731691-2f2a9826-a248-47bc-93d4-373d00f8500f.png#averageHue=%23212327&clientId=u09d8e2a7-0368-4&from=paste&height=241&id=u8134941f&name=image.png&originHeight=301&originWidth=1190&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=45738&status=done&style=none&taskId=uefcde03c-9fbc-4c44-9e15-c1a1e56520d&title=&width=952)
运行结果:>
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679555775701-6e0f5b1b-4b96-48c3-b727-137069f36895.png#averageHue=%23232529&clientId=u09d8e2a7-0368-4&from=paste&height=146&id=ub49de927&name=image.png&originHeight=182&originWidth=508&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=22217&status=done&style=none&taskId=u2973bc5f-416e-435f-a837-bcc5ea60546&title=&width=406.4)

接着是我们的环绕通知, 我们环绕通知是在我们方法的执行前后都有增强代码， **那么我们这里就必须指明在哪个地方调用我们的目标方法。**
因此， 在这里我们需要一个参数。 它可以帮助我们调用目标方法。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679555989357-6c27e939-8d03-445e-951f-3fea93b66886.png#averageHue=%23212226&clientId=u09d8e2a7-0368-4&from=paste&height=278&id=u8091889e&name=image.png&originHeight=347&originWidth=1114&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=54138&status=done&style=none&taskId=uc8d9dd6c-4a7e-4c9f-b996-caa1a59351c&title=&width=891.2)

依旧是执行我们的测试程序:>
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679556093934-e826778c-77d7-4f6f-a2de-9b7f61acad6f.png#averageHue=%23222428&clientId=u09d8e2a7-0368-4&from=paste&height=186&id=u44269715&name=image.png&originHeight=233&originWidth=407&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=23405&status=done&style=none&taskId=u60e0d87e-ccf8-4e1d-b4ae-6bad4bbb598&title=&width=325.6) 这里前环绕和后环绕包着我们的前置通知和我们的后置通知， 但是前环绕和前置通知是平等的~ 后环绕和后置通知同理

接着是我们的异常通知
先在我们的业务方法里手动加个异常~
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679556905691-92f33fab-ac04-48c1-a66c-ede378f4c3d9.png#averageHue=%231f2024&clientId=u09d8e2a7-0368-4&from=paste&height=384&id=u0e496721&name=image.png&originHeight=480&originWidth=909&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=43719&status=done&style=none&taskId=uacbca396-bf0e-4608-bfae-aaaae1e9049&title=&width=727.2)

我们的异常通知：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679556937909-d2749bb9-2552-4030-b25c-5bc280ec81cb.png#averageHue=%23212326&clientId=u09d8e2a7-0368-4&from=paste&height=166&id=u253dd387&name=image.png&originHeight=207&originWidth=877&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=27825&status=done&style=none&taskId=uee77ba28-1de0-4f39-899d-3fe0de082b6&title=&width=701.6)

此时我们运行程序:>
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679556965235-2c55102d-5de4-4a18-a450-7d6562fd4ea2.png#averageHue=%23212326&clientId=u09d8e2a7-0368-4&from=paste&height=302&id=u97457e28&name=image.png&originHeight=377&originWidth=1173&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=43489&status=done&style=none&taskId=u8decc9fa-bd6c-43a6-ac87-148737d3d47&title=&width=938.4)
我们发现， 此时异常通知成功执行， **不过有几个通知没有执行，分别是我们的后置通知还有我们的后环绕~， 如果发生异常的话， 这两个通知是不会执行的~**

接着是我们的最终通知:>
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679557305093-67b1fa80-0f55-4619-9e96-cb103498441e.png#averageHue=%23222427&clientId=u09d8e2a7-0368-4&from=paste&height=143&id=u135509a8&name=image.png&originHeight=179&originWidth=941&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=26909&status=done&style=none&taskId=ub9c63bba-ab94-493e-abb0-5090c911591&title=&width=752.8)
运行以下我们的测试文件>
即使有没有异常， 我们的最终通知都会执行~
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679557343091-bde3d4f2-40d5-40ba-80ff-810c800381c1.png#averageHue=%231f2024&clientId=u09d8e2a7-0368-4&from=paste&height=218&id=u29624ae0&name=image.png&originHeight=273&originWidth=689&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=29104&status=done&style=none&taskId=u8b82d399-fb0c-4e47-8726-dcf9511b706&title=&width=551.2)

没有异常的情况下:>
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679557436633-9e9bc52f-bf3a-4ef9-a355-e3c2f13fea71.png#averageHue=%23222428&clientId=u09d8e2a7-0368-4&from=paste&height=242&id=u728f6913&name=image.png&originHeight=302&originWidth=501&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=29121&status=done&style=none&taskId=u0570d535-6a6b-4b31-8856-af5ad731278&title=&width=400.8)


## 16.6 切面的执行顺序
在实际业务中， 我们在程序中往往不止有一个切面， 那么我们的切面的顺序要怎么指定呢？
在这幅图中， 我们的日志模块，先于我们的事务模块执行。 我们在程序中应该如何指定？
![](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679398320719-57f59ec1-5f1b-46c2-9e08-96fdf5c0dcac.png#averageHue=%23daf1ee&from=url&id=XhQ3r&originHeight=543&originWidth=940&originalType=binary&ratio=1.25&rotation=0&showTitle=false&status=done&style=none&title=)

我们需要用到一个注解@Order来指定我们的顺序.

在这里我们新建一个切面:>
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679588856391-830a5585-677d-492f-8190-ff2f55556968.png#averageHue=%23202125&clientId=ub6037479-4ba0-4&from=paste&height=588&id=uf18b7e03&name=image.png&originHeight=588&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=55052&status=done&style=none&taskId=u64f6be0b-cfb3-4595-a1fa-7868c027b92&title=&width=640)

我们原先的切面:>
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679588898380-b8470524-6e4a-4cc2-a0a4-f47cdbaf5598.png#averageHue=%231f2024&clientId=ub6037479-4ba0-4&from=paste&height=230&id=u4c25818e&name=image.png&originHeight=230&originWidth=843&originalType=binary&ratio=1&rotation=0&showTitle=false&size=29883&status=done&style=none&taskId=u674474d9-5344-429b-9ffd-60bf90ab912&title=&width=843)


假设我们要让我们的事务切面优先执行的话， 就需要我们的@Order注解
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679589045500-6ba67d3e-9cc8-44b0-8642-e5cf0f23e403.png#averageHue=%23202225&clientId=ub6037479-4ba0-4&from=paste&height=155&id=u8e88ae6e&name=image.png&originHeight=155&originWidth=515&originalType=binary&ratio=1&rotation=0&showTitle=false&size=14034&status=done&style=none&taskId=u3b437ced-78cc-4f85-9fcd-19b9763f981&title=&width=515) ![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679589056330-87d324dd-ee28-4fde-8552-6ef5dbe6b5fd.png#averageHue=%23212226&clientId=ub6037479-4ba0-4&from=paste&height=157&id=ub0252b9e&name=image.png&originHeight=157&originWidth=424&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12041&status=done&style=none&taskId=u867a73c2-9610-4952-81e7-535af33ed92&title=&width=424)
注意！！ 在这里@Order里面的值越小， 意味着该切面越优先执行。
我们跑一下运行程序
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679589135666-87ae3d65-e54a-4d35-830a-845f6f9ba470.png#averageHue=%23212326&clientId=ub6037479-4ba0-4&from=paste&height=276&id=u90fc287e&name=image.png&originHeight=276&originWidth=435&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16035&status=done&style=none&taskId=u19eb5a90-e3f9-4340-bc63-6277c360bda&title=&width=435)


## 16.7 定义通用切点
在我们的日志切面里， 我们写了很多的切点表达式， 这些表达式的值都相同， 但我们每次都需要重写一遍，代码没有得到复用， 是不行的。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679589234272-451f8df3-6e12-4537-99eb-5c57d5b05172.png#averageHue=%231f2124&clientId=ub6037479-4ba0-4&from=paste&height=801&id=u5e61f49e&name=image.png&originHeight=801&originWidth=986&originalType=binary&ratio=1&rotation=0&showTitle=false&size=122695&status=done&style=none&taskId=u4ebf956a-805a-4308-b454-a0bfdb986e2&title=&width=986)

因此， 在这里我们可以定义一个通用切点供这些方法使用，需要用到我们的@Pointcut注解
在@Pointcut注解里面写我们的切点表达式， 这样**我们可以在下方直接使用我们的方法名作为一个切点。**
  ![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679589379987-6ed8dbf1-90c5-4067-b8fe-7b4283bdae09.png#averageHue=%23202225&clientId=ub6037479-4ba0-4&from=paste&height=401&id=u705dbb93&name=image.png&originHeight=401&originWidth=754&originalType=binary&ratio=1&rotation=0&showTitle=false&size=56232&status=done&style=none&taskId=ub9efcd1e-d361-4f02-a426-1674b1b59ef&title=&width=754)

## 16.8 全注解式开发AOP

在这里我们将用一个配置类来代替我们的xml配置文件， 那么我们的AOP自动代理就需要通过注解来解决:>
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679589625332-f857a162-e1d5-44e4-ab71-ddb97bc20fdc.png#averageHue=%231f2023&clientId=ub6037479-4ba0-4&from=paste&height=293&id=u9c375ee6&name=image.png&originHeight=293&originWidth=760&originalType=binary&ratio=1&rotation=0&showTitle=false&size=30571&status=done&style=none&taskId=u770fee42-c4a7-4191-b348-1cd5fbee4a2&title=&width=760)
我们的测试程序及其运行结果:>
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34300248/1679616572745-0b1f3853-d5d3-4d4c-801f-0454ea5a5534.png#averageHue=%23222428&clientId=u46d7435a-bf07-4&from=paste&height=494&id=u3ed86de6&name=image.png&originHeight=617&originWidth=799&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=63610&status=done&style=none&taskId=u7b0c9f56-5692-4665-bfb6-b56ccac6e20&title=&width=639.2)
