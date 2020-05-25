# JSSPA
JS SPA


1：SPA_engine 通过hash来创建view，初始化view信息，顺序加载view依赖文件
2：所有依赖文件加载完毕，注册view
3：hash change 通知 engine switchView(hash变化，回到第一步)