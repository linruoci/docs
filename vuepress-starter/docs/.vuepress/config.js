module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around',
    themeConfig: {
        logo: '/assets/img/hero.png',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/about' },
            { text: 'External', link: 'https://google.com' },
            {
                text: 'Languages',
                ariaLabel: 'Language Menu',
                items: [
                    { text: 'Chinese', link: '/language/chinese/' },
                    { text: 'Japanese', link: '/language/japanese/' }
                ]
            },
        ],
        // sidebar: [
        //     // '/',
        //     // 'about.md',
        //     // 'about2.md',
        //     // //这段代码可以用来进行分组
        //     // //后面可以对商品进行分类。
        //     // {
        //     //     title: 'Group 1',   // 必要的
        //     //     path: '/art/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        //     //     collapsable: false, // 可选的, 默认值是 true,
        //     //     sidebarDepth: 1,    // 可选的, 默认值是 1
        //     //     children: [
        //     //         '/art/art1',
        //     //         '/art/art2',
        //     //     ]
        //     // },

        // ]

        sidebar: {
            '/art/': [
              '',     /* /foo/ */
              'art1',  /* /foo/one.html */
              'art2'   /* /foo/two.html */
            ],
          }
    }

};

