const resourceCatalog = {
    javascript: [
        {
            title: "MDN JavaScript Guide",
            description:
                "Structured JavaScript learning covering the language, objects, functions, modules, and browser APIs.",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
            type: "Documentation",
        },
        {
            title: "JavaScript.info",
            description:
                "A complete JavaScript tutorial from fundamentals to advanced concepts.",
            url: "https://javascript.info/",
            type: "Tutorial",
        },
        {
            title: "JavaScript Full Course",
            description:
                "Free full-length JavaScript courses and tutorials from programming educators.",
            url: "https://www.youtube.com/results?search_query=freeCodeCamp+JavaScript+full+course",
            type: "YouTube",
        },
    ],

    java: [
        {
            title: "Dev.java",
            description:
                "Official Java learning resources, tutorials, and language documentation.",
            url: "https://dev.java/learn/",
            type: "Official Learning",
        },
        {
            title: "Java Documentation",
            description:
                "Official Java API and language documentation.",
            url: "https://docs.oracle.com/en/java/",
            type: "Documentation",
        },
        {
            title: "Java Full Course",
            description:
                "Free Java programming courses covering core syntax, OOP, collections, and application development.",
            url: "https://www.youtube.com/results?search_query=Java+full+course+beginners",
            type: "YouTube",
        },
    ],

    "spring boot": [
        {
            title: "Spring Boot Documentation",
            description:
                "Official Spring Boot reference documentation and guides.",
            url: "https://docs.spring.io/spring-boot/index.html",
            type: "Documentation",
        },
        {
            title: "Spring Guides",
            description:
                "Hands-on guides for building applications with Spring.",
            url: "https://spring.io/guides",
            type: "Tutorials",
        },
        {
            title: "Spring Boot Full Course",
            description:
                "Free Spring Boot tutorials covering REST APIs, dependency injection, databases, and application development.",
            url: "https://www.youtube.com/results?search_query=Spring+Boot+full+course+beginners",
            type: "YouTube",
        },
    ],

    "spring security": [
        {
            title: "Spring Security Documentation",
            description:
                "Official documentation for authentication and authorization with Spring Security.",
            url: "https://docs.spring.io/spring-security/reference/",
            type: "Documentation",
        },
    ],

    hibernate: [
        {
            title: "Hibernate ORM Documentation",
            description:
                "Official Hibernate ORM documentation and guides.",
            url: "https://hibernate.org/orm/documentation/",
            type: "Documentation",
        },
    ],

    mysql: [
        {
            title: "MySQL Documentation",
            description:
                "Official MySQL reference manual and SQL documentation.",
            url: "https://dev.mysql.com/doc/",
            type: "Documentation",
        },
    ],

    postgresql: [
        {
            title: "PostgreSQL Documentation",
            description:
                "Official PostgreSQL documentation and SQL reference.",
            url: "https://www.postgresql.org/docs/",
            type: "Documentation",
        },
    ],

    react: [
        {
            title: "React Learn",
            description:
                "Official React learning materials and core concepts.",
            url: "https://react.dev/learn",
            type: "Official Learning",
        },
        {
            title: "React Full Course",
            description:
                "Free React courses covering components, props, state, hooks, and application development.",
            url: "https://www.youtube.com/results?search_query=freeCodeCamp+React+full+course",
            type: "YouTube",
        },
    ],

    "node.js": [
        {
            title: "Node.js Documentation",
            description:
                "Official Node.js API documentation and guides.",
            url: "https://nodejs.org/docs/latest/api/",
            type: "Documentation",
        },
    ],

    node: [
        {
            title: "Node.js Documentation",
            description:
                "Official Node.js API documentation and guides.",
            url: "https://nodejs.org/docs/latest/api/",
            type: "Documentation",
        },
    ],

    typescript: [
        {
            title: "TypeScript Handbook",
            description:
                "Official TypeScript handbook and language reference.",
            url: "https://www.typescriptlang.org/docs/handbook/intro.html",
            type: "Documentation",
        },
    ],

    python: [
        {
            title: "Python Documentation",
            description:
                "Official Python tutorial and language documentation.",
            url: "https://docs.python.org/3/tutorial/",
            type: "Official Learning",
        },
    ],

    django: [
        {
            title: "Django Documentation",
            description:
                "Official Django documentation and beginner tutorials.",
            url: "https://docs.djangoproject.com/en/stable/",
            type: "Documentation",
        },
    ],

    "c++": [
        {
            title: "cppreference",
            description:
                "Comprehensive C++ language and standard library reference.",
            url: "https://en.cppreference.com/",
            type: "Reference",
        },
    ],

    csharp: [
        {
            title: ".NET C# Documentation",
            description:
                "Official C# and .NET learning and reference documentation.",
            url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
            type: "Official Learning",
        },
    ],

    ".net": [
        {
            title: ".NET Documentation",
            description:
                "Official .NET platform documentation and tutorials.",
            url: "https://learn.microsoft.com/en-us/dotnet/",
            type: "Documentation",
        },
    ],

    git: [
        {
            title: "Git Documentation",
            description:
                "Official Git documentation and reference.",
            url: "https://git-scm.com/doc",
            type: "Documentation",
        },
    ],

    docker: [
        {
            title: "Docker Documentation",
            description:
                "Official Docker documentation, guides, and tutorials.",
            url: "https://docs.docker.com/",
            type: "Documentation",
        },
    ],

    kubernetes: [
        {
            title: "Kubernetes Documentation",
            description:
                "Official Kubernetes documentation and learning resources.",
            url: "https://kubernetes.io/docs/home/",
            type: "Documentation",
        },
    ],

    html: [
        {
            title: "MDN Learn HTML",
            description:
                "Learn HTML from the basics through semantic structure, links, forms, images, and accessible markup.",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content",
            type: "Structured Course",
        },
        {
            title: "MDN HTML Guides",
            description:
                "Practical HTML guides, references, and common tasks.",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides",
            type: "Guide",
        },
        {
            title: "HTML Full Course - freeCodeCamp",
            description:
                "Complete beginner HTML5 course covering tags, links, images, forms, tables, semantic HTML, and more.",
            url: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
            type: "YouTube",
        },
    ],

    css: [
        {
            title: "MDN CSS",
            description:
                "Learn CSS fundamentals, selectors, layout, Flexbox, Grid, responsive design, and more.",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
            type: "Documentation",
        },
        {
            title: "MDN CSS Learning",
            description:
                "Structured CSS learning covering styling fundamentals and modern layout techniques.",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics",
            type: "Structured Course",
        },
        {
            title: "CSS Full Course",
            description:
                "Complete CSS learning course for beginners and practical web development.",
            url: "https://www.youtube.com/results?search_query=freeCodeCamp+CSS+full+course",
            type: "YouTube",
        },
    ],

    tailwind: [
        {
            title: "Tailwind CSS Documentation",
            description:
                "Official Tailwind CSS documentation covering utility classes, responsive design, layouts, and components.",
            url: "https://tailwindcss.com/docs",
            type: "Documentation",
        },
    ],

    angular: [
        {
            title: "Angular Documentation",
            description: "Official Angular tutorials, guides, and API documentation.",
            url: "https://angular.dev/",
            type: "Official Learning",
        },
    ],

    vue: [
        {
            title: "Vue.js Guide",
            description: "Official Vue guide covering fundamentals and application development.",
            url: "https://vuejs.org/guide/",
            type: "Official Learning",
        },
    ],

    "svelte": [
        {
            title: "Svelte Tutorial",
            description: "Official interactive Svelte tutorial and documentation.",
            url: "https://svelte.dev/tutorial/",
            type: "Official Learning",
        },
    ],

    "next.js": [
        {
            title: "Next.js Learn",
            description: "Official Next.js learning course and framework documentation.",
            url: "https://nextjs.org/learn",
            type: "Structured Course",
        },
        {
            title: "Next.js Documentation",
            description: "Official Next.js documentation and guides.",
            url: "https://nextjs.org/docs",
            type: "Documentation",
        },
    ],

    bootstrap: [
        {
            title: "Bootstrap Documentation",
            description: "Official Bootstrap documentation and examples.",
            url: "https://getbootstrap.com/docs/",
            type: "Documentation",
        },
    ],

    "express.js": [
        {
            title: "Express Documentation",
            description: "Official Express.js guide and API documentation.",
            url: "https://expressjs.com/",
            type: "Documentation",
        },
    ],

    express: [
        {
            title: "Express Documentation",
            description: "Official Express.js guide and API documentation.",
            url: "https://expressjs.com/",
            type: "Documentation",
        },
    ],

    spring: [
        {
            title: "Spring Documentation",
            description: "Official Spring Framework documentation and guides.",
            url: "https://spring.io/projects/spring-framework",
            type: "Documentation",
        },
    ],

    flask: [
        {
            title: "Flask Documentation",
            description: "Official Flask documentation and quickstart guides.",
            url: "https://flask.palletsprojects.com/",
            type: "Documentation",
        },
    ],

    fastapi: [
        {
            title: "FastAPI Documentation",
            description: "Official FastAPI documentation and interactive API tutorials.",
            url: "https://fastapi.tiangolo.com/",
            type: "Documentation",
        },
    ],

    "ruby on rails": [
        {
            title: "Ruby on Rails Guides",
            description: "Official Rails guides for building web applications.",
            url: "https://guides.rubyonrails.org/",
            type: "Official Learning",
        },
    ],

    laravel: [
        {
            title: "Laravel Documentation",
            description: "Official Laravel documentation and learning resources.",
            url: "https://laravel.com/docs",
            type: "Documentation",
        },
    ],

    go: [
        {
            title: "A Tour of Go",
            description: "Official interactive introduction to the Go programming language.",
            url: "https://go.dev/tour/",
            type: "Interactive Course",
        },
        {
            title: "Go Documentation",
            description: "Official Go language and standard library documentation.",
            url: "https://go.dev/doc/",
            type: "Documentation",
        },
    ],

    rust: [
        {
            title: "The Rust Book",
            description: "Official Rust programming language book.",
            url: "https://doc.rust-lang.org/book/",
            type: "Structured Course",
        },
        {
            title: "Rust By Example",
            description: "Learn Rust concepts through executable examples.",
            url: "https://doc.rust-lang.org/rust-by-example/",
            type: "Interactive Learning",
        },
    ],

    kotlin: [
        {
            title: "Kotlin Documentation",
            description: "Official Kotlin tutorials, language guide, and API reference.",
            url: "https://kotlinlang.org/docs/home.html",
            type: "Documentation",
        },
    ],

    swift: [
        {
            title: "The Swift Programming Language",
            description: "Official Swift language guide and reference.",
            url: "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/",
            type: "Structured Course",
        },
    ],

    php: [
        {
            title: "PHP Manual",
            description: "Official PHP documentation and language reference.",
            url: "https://www.php.net/manual/en/",
            type: "Documentation",
        },
    ],

    mongodb: [
        {
            title: "MongoDB University",
            description: "Free MongoDB courses and learning paths.",
            url: "https://learn.mongodb.com/",
            type: "Course",
        },
        {
            title: "MongoDB Documentation",
            description: "Official MongoDB documentation and developer resources.",
            url: "https://www.mongodb.com/docs/",
            type: "Documentation",
        },
    ],

    redis: [
        {
            title: "Redis Documentation",
            description: "Official Redis documentation and developer tutorials.",
            url: "https://redis.io/docs/",
            type: "Documentation",
        },
    ],

    sqlite: [
        {
            title: "SQLite Documentation",
            description: "Official SQLite documentation and SQL reference.",
            url: "https://www.sqlite.org/docs.html",
            type: "Documentation",
        },
    ],

    sql: [
        {
            title: "SQLBolt",
            description: "Interactive SQL lessons and exercises.",
            url: "https://sqlbolt.com/",
            type: "Interactive Course",
        },
    ],

    aws: [
        {
            title: "AWS Skill Builder",
            description: "Official AWS learning resources and training.",
            url: "https://skillbuilder.aws/",
            type: "Course",
        },
    ],

    azure: [
        {
            title: "Microsoft Learn - Azure",
            description: "Official Azure learning paths and modules.",
            url: "https://learn.microsoft.com/en-us/training/azure/",
            type: "Structured Course",
        },
    ],

    gcp: [
        {
            title: "Google Cloud Skills Boost",
            description: "Official Google Cloud labs and learning resources.",
            url: "https://www.cloudskillsboost.google/",
            type: "Course",
        },
    ],

    terraform: [
        {
            title: "Terraform Documentation",
            description: "Official Terraform documentation and tutorials.",
            url: "https://developer.hashicorp.com/terraform/docs",
            type: "Documentation",
        },
    ],

    "machine learning": [
        {
            title: "Scikit-learn User Guide",
            description: "Practical machine learning documentation and examples.",
            url: "https://scikit-learn.org/stable/user_guide.html",
            type: "Documentation",
        },
    ],

    pytorch: [
        {
            title: "PyTorch Tutorials",
            description: "Official PyTorch tutorials and examples.",
            url: "https://docs.pytorch.org/tutorials/",
            type: "Tutorials",
        },
    ],

    tensorflow: [
        {
            title: "TensorFlow Tutorials",
            description: "Official TensorFlow tutorials and learning resources.",
            url: "https://www.tensorflow.org/tutorials",
            type: "Tutorials",
        },
    ],

    pandas: [
        {
            title: "Pandas Getting Started",
            description: "Official pandas tutorials and getting-started material.",
            url: "https://pandas.pydata.org/docs/getting_started/",
            type: "Tutorial",
        },
    ],

    // ============================================================
    // ADDITIONAL LEARNING RESOURCES
    // ============================================================

    c: [
        {
            title: "C Programming - CS50",
            description:
                "University-level introduction to programming and computer science using C.",
            url: "https://cs50.harvard.edu/x/",
            type: "University Course",
        },
        {
            title: "Learn C - Programiz",
            description:
                "Beginner-friendly interactive C programming tutorials.",
            url: "https://www.programiz.com/c-programming",
            type: "Interactive Course",
        },
        {
            title: "C Programming Full Course",
            description:
                "Search for comprehensive free C programming courses on YouTube.",
            url: "https://www.youtube.com/results?search_query=C+programming+full+course",
            type: "YouTube",
        },
    ],

    "data structures": [
        {
            title: "Data Structures and Algorithms - freeCodeCamp",
            description:
                "Free courses and projects covering core data structures and algorithms.",
            url: "https://www.freecodecamp.org/learn/",
            type: "Course",
        },
        {
            title: "Data Structures and Algorithms",
            description:
                "Hands-on DSA learning with programming exercises.",
            url: "https://www.boot.dev/courses",
            type: "Course",
        },
        {
            title: "Data Structures and Algorithms Course",
            description:
                "Free DSA courses and lectures.",
            url: "https://www.youtube.com/results?search_query=data+structures+and+algorithms+full+course",
            type: "YouTube",
        },
    ],

    dsa: [
        {
            title: "Data Structures and Algorithms - freeCodeCamp",
            description:
                "Free DSA learning resources and programming projects.",
            url: "https://www.freecodecamp.org/learn/",
            type: "Course",
        },
        {
            title: "Learn Data Structures and Algorithms",
            description:
                "Hands-on DSA learning with practical exercises.",
            url: "https://www.boot.dev/courses",
            type: "Course",
        },
        {
            title: "DSA Full Course",
            description:
                "Free data structures and algorithms courses on YouTube.",
            url: "https://www.youtube.com/results?search_query=data+structures+and+algorithms+full+course",
            type: "YouTube",
        },
    ],

    algorithms: [
        {
            title: "Algorithms - MIT OpenCourseWare",
            description:
                "University-level algorithms lectures and course material.",
            url: "https://ocw.mit.edu/search/?q=algorithms",
            type: "University Course",
        },
        {
            title: "Algorithms Full Course",
            description:
                "Free algorithms courses and lectures on YouTube.",
            url: "https://www.youtube.com/results?search_query=algorithms+full+course+computer+science",
            type: "YouTube",
        },
    ],

    "object oriented programming": [
        {
            title: "Object-Oriented Programming",
            description:
                "Learn object-oriented programming principles and design techniques.",
            url: "https://www.youtube.com/results?search_query=object+oriented+programming+full+course",
            type: "YouTube",
        },
        {
            title: "Software Construction in Java",
            description:
                "MIT course material covering object-oriented design, testing, and debugging in Java.",
            url: "https://ocw.mit.edu/search/?q=software+construction+java",
            type: "University Course",
        },
    ],

    linux: [
        {
            title: "Linux Journey",
            description:
                "Free guided lessons covering Linux fundamentals and command-line usage.",
            url: "https://linuxjourney.com/",
            type: "Interactive Course",
        },
        {
            title: "Boot.dev Linux Course",
            description:
                "Hands-on Linux course focused on practical developer skills.",
            url: "https://www.boot.dev/courses",
            type: "Course",
        },
        {
            title: "Linux Full Course",
            description:
                "Free Linux courses and command-line tutorials.",
            url: "https://www.youtube.com/results?search_query=Linux+full+course+beginners",
            type: "YouTube",
        },
    ],

    github: [
        {
            title: "GitHub Skills",
            description:
                "Interactive GitHub courses covering repositories, pull requests, Actions, and more.",
            url: "https://skills.github.com/",
            type: "Interactive Course",
        },
        {
            title: "GitHub Documentation",
            description:
                "Official GitHub documentation and developer guides.",
            url: "https://docs.github.com/",
            type: "Documentation",
        },
        {
            title: "Git and GitHub Course",
            description:
                "Free Git and GitHub tutorials and courses.",
            url: "https://www.youtube.com/results?search_query=Git+and+GitHub+full+course",
            type: "YouTube",
        },
    ],

    rest: [
        {
            title: "REST API Tutorial",
            description:
                "Learn REST principles, HTTP methods, resources, status codes, and API design.",
            url: "https://www.freecodecamp.org/news/rest-api-tutorial/",
            type: "Tutorial",
        },
        {
            title: "REST API Full Course",
            description:
                "Free REST API development courses and tutorials.",
            url: "https://www.youtube.com/results?search_query=REST+API+full+course",
            type: "YouTube",
        },
    ],

    "rest api": [
        {
            title: "REST API Tutorial",
            description:
                "Learn REST principles, HTTP methods, resources, status codes, and API design.",
            url: "https://www.freecodecamp.org/news/rest-api-tutorial/",
            type: "Tutorial",
        },
        {
            title: "REST API Full Course",
            description:
                "Free REST API development courses and tutorials.",
            url: "https://www.youtube.com/results?search_query=REST+API+full+course",
            type: "YouTube",
        },
    ],

    http: [
        {
            title: "MDN HTTP",
            description:
                "Learn HTTP requests, responses, headers, status codes, caching, and related web concepts.",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
            type: "Documentation",
        },
        {
            title: "HTTP Full Course",
            description:
                "Free HTTP and web networking courses.",
            url: "https://www.youtube.com/results?search_query=HTTP+protocol+full+course",
            type: "YouTube",
        },
    ],

    graphql: [
        {
            title: "GraphQL Learn",
            description:
                "Official GraphQL learning material and core concepts.",
            url: "https://graphql.org/learn/",
            type: "Official Learning",
        },
        {
            title: "Full Stack Open - GraphQL",
            description:
                "Hands-on GraphQL learning as part of Full Stack Open.",
            url: "https://fullstackopen.com/en/part8/",
            type: "Course",
        },
        {
            title: "GraphQL Full Course",
            description:
                "Free GraphQL courses and tutorials.",
            url: "https://www.youtube.com/results?search_query=GraphQL+full+course",
            type: "YouTube",
        },
    ],

    redis: [
        {
            title: "Redis University",
            description:
                "Free courses covering Redis concepts and practical usage.",
            url: "https://university.redis.io/",
            type: "Course",
        },
        {
            title: "Redis Documentation",
            description:
                "Official Redis documentation and tutorials.",
            url: "https://redis.io/docs/",
            type: "Documentation",
        },
        {
            title: "Redis Full Course",
            description:
                "Free Redis tutorials and courses.",
            url: "https://www.youtube.com/results?search_query=Redis+full+course",
            type: "YouTube",
        },
    ],

    elasticsearch: [
        {
            title: "Elastic Learn",
            description:
                "Official Elastic learning resources and courses.",
            url: "https://www.elastic.co/learn",
            type: "Course",
        },
        {
            title: "Elasticsearch Documentation",
            description:
                "Official Elasticsearch documentation.",
            url: "https://www.elastic.co/docs",
            type: "Documentation",
        },
        {
            title: "Elasticsearch Full Course",
            description:
                "Free Elasticsearch learning courses.",
            url: "https://www.youtube.com/results?search_query=Elasticsearch+full+course",
            type: "YouTube",
        },
    ],

    kafka: [
        {
            title: "Confluent Developer",
            description:
                "Hands-on Apache Kafka courses, tutorials, and examples.",
            url: "https://developer.confluent.io/",
            type: "Course",
        },
        {
            title: "Apache Kafka Documentation",
            description:
                "Official Apache Kafka documentation.",
            url: "https://kafka.apache.org/documentation/",
            type: "Documentation",
        },
        {
            title: "Kafka Full Course",
            description:
                "Free Apache Kafka courses and tutorials.",
            url: "https://www.youtube.com/results?search_query=Apache+Kafka+full+course",
            type: "YouTube",
        },
    ],

    rabbitmq: [
        {
            title: "RabbitMQ Tutorials",
            description:
                "Official RabbitMQ tutorials covering queues, messaging, routing, and more.",
            url: "https://www.rabbitmq.com/tutorials",
            type: "Tutorial",
        },
        {
            title: "RabbitMQ Full Course",
            description:
                "Free RabbitMQ messaging tutorials.",
            url: "https://www.youtube.com/results?search_query=RabbitMQ+full+course",
            type: "YouTube",
        },
    ],

    maven: [
        {
            title: "Maven Getting Started Guide",
            description:
                "Official Maven guide covering project management and builds.",
            url: "https://maven.apache.org/guides/getting-started/",
            type: "Official Learning",
        },
        {
            title: "Maven Full Course",
            description:
                "Free Maven tutorials for Java developers.",
            url: "https://www.youtube.com/results?search_query=Maven+Java+full+course",
            type: "YouTube",
        },
    ],

    gradle: [
        {
            title: "Gradle Learn",
            description:
                "Official Gradle learning resources and build system guides.",
            url: "https://gradle.org/training/",
            type: "Course",
        },
        {
            title: "Gradle Documentation",
            description:
                "Official Gradle documentation.",
            url: "https://docs.gradle.org/current/userguide/userguide.html",
            type: "Documentation",
        },
        {
            title: "Gradle Full Course",
            description:
                "Free Gradle tutorials.",
            url: "https://www.youtube.com/results?search_query=Gradle+Java+full+course",
            type: "YouTube",
        },
    ],

    junit: [
        {
            title: "JUnit 5 User Guide",
            description:
                "Official JUnit 5 documentation and testing guides.",
            url: "https://junit.org/junit5/docs/current/user-guide/",
            type: "Documentation",
        },
        {
            title: "JUnit Testing Course",
            description:
                "Free Java testing tutorials and courses.",
            url: "https://www.youtube.com/results?search_query=JUnit+5+testing+full+course",
            type: "YouTube",
        },
    ],

    jest: [
        {
            title: "Jest Documentation",
            description:
                "Official Jest documentation and testing guides.",
            url: "https://jestjs.io/docs/getting-started",
            type: "Documentation",
        },
        {
            title: "Jest Testing Course",
            description:
                "Free Jest and JavaScript testing courses.",
            url: "https://www.youtube.com/results?search_query=Jest+testing+full+course",
            type: "YouTube",
        },
    ],

    vitest: [
        {
            title: "Vitest Documentation",
            description:
                "Official Vitest documentation and testing guides.",
            url: "https://vitest.dev/guide/",
            type: "Documentation",
        },
        {
            title: "Vitest Testing Tutorial",
            description:
                "Free Vitest testing tutorials.",
            url: "https://www.youtube.com/results?search_query=Vitest+testing+tutorial",
            type: "YouTube",
        },
    ],

    playwright: [
        {
            title: "Playwright Documentation",
            description:
                "Official browser automation and end-to-end testing documentation.",
            url: "https://playwright.dev/docs/intro",
            type: "Documentation",
        },
        {
            title: "Playwright Testing Course",
            description:
                "Free Playwright end-to-end testing tutorials.",
            url: "https://www.youtube.com/results?search_query=Playwright+testing+full+course",
            type: "YouTube",
        },
    ],

    cypress: [
        {
            title: "Cypress Documentation",
            description:
                "Official Cypress end-to-end testing documentation.",
            url: "https://docs.cypress.io/",
            type: "Documentation",
        },
        {
            title: "Cypress Testing Course",
            description:
                "Free Cypress testing courses and tutorials.",
            url: "https://www.youtube.com/results?search_query=Cypress+testing+full+course",
            type: "YouTube",
        },
    ],

    flutter: [
        {
            title: "Flutter Learning",
            description:
                "Official Flutter learning resources, tutorials, and codelabs.",
            url: "https://docs.flutter.dev/get-started/learn-flutter",
            type: "Official Learning",
        },
        {
            title: "Flutter Codelabs",
            description:
                "Hands-on Flutter development exercises and projects.",
            url: "https://docs.flutter.dev/codelabs",
            type: "Interactive Course",
        },
        {
            title: "Flutter Full Course",
            description:
                "Free Flutter development courses.",
            url: "https://www.youtube.com/results?search_query=Flutter+full+course+beginners",
            type: "YouTube",
        },
    ],

    dart: [
        {
            title: "Dart Language Tour",
            description:
                "Official Dart language learning and reference material.",
            url: "https://dart.dev/language",
            type: "Official Learning",
        },
        {
            title: "Dart Full Course",
            description:
                "Free Dart programming courses.",
            url: "https://www.youtube.com/results?search_query=Dart+programming+full+course",
            type: "YouTube",
        },
    ],

    android: [
        {
            title: "Android Basics with Compose",
            description:
                "Official Android course for modern Android development.",
            url: "https://developer.android.com/courses/android-basics-compose/course",
            type: "Course",
        },
        {
            title: "Android Developers",
            description:
                "Official Android development documentation and training.",
            url: "https://developer.android.com/",
            type: "Official Learning",
        },
        {
            title: "Android Development Full Course",
            description:
                "Free Android development courses.",
            url: "https://www.youtube.com/results?search_query=Android+development+full+course",
            type: "YouTube",
        },
    ],

    kotlin: [
        {
            title: "Kotlin Koans",
            description:
                "Interactive exercises for learning Kotlin.",
            url: "https://play.kotlinlang.org/koans",
            type: "Interactive Course",
        },
        {
            title: "Kotlin Documentation",
            description:
                "Official Kotlin tutorials and documentation.",
            url: "https://kotlinlang.org/docs/home.html",
            type: "Documentation",
        },
        {
            title: "Kotlin Full Course",
            description:
                "Free Kotlin programming courses.",
            url: "https://www.youtube.com/results?search_query=Kotlin+full+course+beginners",
            type: "YouTube",
        },
    ],

    swift: [
        {
            title: "The Swift Programming Language",
            description:
                "Official Swift language guide.",
            url: "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/",
            type: "Structured Course",
        },
        {
            title: "Swift Tutorials",
            description:
                "Official Swift tutorials and learning resources.",
            url: "https://developer.apple.com/tutorials/swiftui",
            type: "Interactive Course",
        },
        {
            title: "Swift Full Course",
            description:
                "Free Swift programming courses.",
            url: "https://www.youtube.com/results?search_query=Swift+programming+full+course",
            type: "YouTube",
        },
    ],

    "react native": [
        {
            title: "React Native Documentation",
            description:
                "Official React Native guides and API documentation.",
            url: "https://reactnative.dev/docs/getting-started",
            type: "Documentation",
        },
        {
            title: "Full Stack Open - React Native",
            description:
                "Free React Native learning material from the University of Helsinki.",
            url: "https://fullstackopen.com/en/part10/",
            type: "Course",
        },
        {
            title: "React Native Full Course",
            description:
                "Free React Native development courses.",
            url: "https://www.youtube.com/results?search_query=React+Native+full+course",
            type: "YouTube",
        },
    ],

    numpy: [
        {
            title: "NumPy Learn",
            description:
                "Official NumPy tutorials and learning resources.",
            url: "https://numpy.org/learn/",
            type: "Tutorial",
        },
        {
            title: "NumPy Documentation",
            description:
                "Official NumPy reference documentation.",
            url: "https://numpy.org/doc/",
            type: "Documentation",
        },
        {
            title: "NumPy Full Course",
            description:
                "Free NumPy courses and tutorials.",
            url: "https://www.youtube.com/results?search_query=NumPy+full+course",
            type: "YouTube",
        },
    ],

    scikit: [
        {
            title: "Scikit-learn User Guide",
            description:
                "Official machine learning algorithms, examples, and user guides.",
            url: "https://scikit-learn.org/stable/user_guide.html",
            type: "Documentation",
        },
        {
            title: "Machine Learning with Scikit-learn",
            description:
                "Free machine learning courses and practical tutorials.",
            url: "https://www.youtube.com/results?search_query=scikit+learn+machine+learning+full+course",
            type: "YouTube",
        },
    ],

    "data science": [
        {
            title: "Kaggle Learn",
            description:
                "Free hands-on courses covering Python, pandas, machine learning, SQL, and more.",
            url: "https://www.kaggle.com/learn",
            type: "Interactive Course",
        },
        {
            title: "Harvard CS50's Introduction to Data Science",
            description:
                "University-level data science education and practical exercises.",
            url: "https://cs50.harvard.edu/",
            type: "University Course",
        },
        {
            title: "Data Science Full Course",
            description:
                "Free data science courses and tutorials.",
            url: "https://www.youtube.com/results?search_query=data+science+full+course",
            type: "YouTube",
        },
    ],

    "deep learning": [
        {
            title: "PyTorch Tutorials",
            description:
                "Official PyTorch tutorials and practical deep learning examples.",
            url: "https://docs.pytorch.org/tutorials/",
            type: "Tutorials",
        },
        {
            title: "TensorFlow Tutorials",
            description:
                "Official TensorFlow tutorials for machine learning and deep learning.",
            url: "https://www.tensorflow.org/tutorials",
            type: "Tutorials",
        },
        {
            title: "Deep Learning Full Course",
            description:
                "Free deep learning courses and lectures.",
            url: "https://www.youtube.com/results?search_query=deep+learning+full+course",
            type: "YouTube",
        },
    ],

    "generative ai": [
        {
            title: "Hugging Face Learn",
            description:
                "Free courses covering large language models, NLP, agents, and modern AI.",
            url: "https://huggingface.co/learn",
            type: "Course",
        },
        {
            title: "Google Machine Learning Crash Course",
            description:
                "Free machine learning course and practical exercises from Google.",
            url: "https://developers.google.com/machine-learning/crash-course",
            type: "Course",
        },
        {
            title: "Generative AI Full Course",
            description:
                "Free generative AI courses and tutorials.",
            url: "https://www.youtube.com/results?search_query=generative+AI+full+course",
            type: "YouTube",
        },
    ],

    llm: [
        {
            title: "Hugging Face LLM Course",
            description:
                "Free course covering transformers, datasets, tokenizers, fine-tuning, and LLM applications.",
            url: "https://huggingface.co/learn/nlp-course/",
            type: "Course",
        },
        {
            title: "LLM Course",
            description:
                "Free large language model courses and tutorials.",
            url: "https://www.youtube.com/results?search_query=LLM+full+course+beginners",
            type: "YouTube",
        },
    ],

    rag: [
        {
            title: "Hugging Face Learn",
            description:
                "Learning resources for modern NLP, LLMs, retrieval, and AI applications.",
            url: "https://huggingface.co/learn",
            type: "Course",
        },
        {
            title: "RAG Full Course",
            description:
                "Free Retrieval Augmented Generation courses and tutorials.",
            url: "https://www.youtube.com/results?search_query=RAG+retrieval+augmented+generation+full+course",
            type: "YouTube",
        },
    ],

    "system design": [
        {
            title: "System Design Primer",
            description:
                "Open-source system design learning material and interview preparation.",
            url: "https://github.com/donnemartin/system-design-primer",
            type: "Course",
        },
        {
            title: "System Design Course",
            description:
                "Free system design lectures and architecture tutorials.",
            url: "https://www.youtube.com/results?search_query=system+design+full+course",
            type: "YouTube",
        },
    ],

    "software engineering": [
        {
            title: "CS50",
            description:
                "Free university-level introduction to computer science and software engineering fundamentals.",
            url: "https://cs50.harvard.edu/x/",
            type: "University Course",
        },
        {
            title: "The Odin Project",
            description:
                "Project-based curriculum for learning modern web development.",
            url: "https://www.theodinproject.com/paths",
            type: "Project-Based Course",
        },
    ],

    "full stack": [
        {
            title: "Full Stack Open",
            description:
                "Free modern full-stack course covering React, Node.js, MongoDB, GraphQL, TypeScript and testing.",
            url: "https://fullstackopen.com/en/",
            type: "University Course",
        },
        {
            title: "The Odin Project",
            description:
                "Free project-based full-stack web development paths.",
            url: "https://www.theodinproject.com/paths",
            type: "Project-Based Course",
        },
        {
            title: "freeCodeCamp",
            description:
                "Free interactive coding courses and projects.",
            url: "https://www.freecodecamp.org/learn/",
            type: "Interactive Course",
        },
        {
            title: "Full Stack Development",
            description:
                "Free full-stack development courses and tutorials.",
            url: "https://www.youtube.com/results?search_query=full+stack+web+development+full+course",
            type: "YouTube",
        },
    ],

    "web development": [
        {
            title: "MDN Learn Web Development",
            description:
                "Structured frontend curriculum covering HTML, CSS, JavaScript and web fundamentals.",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
            type: "Structured Course",
        },
        {
            title: "The Odin Project",
            description:
                "Hands-on full-stack web development curriculum.",
            url: "https://www.theodinproject.com/paths",
            type: "Project-Based Course",
        },
        {
            title: "freeCodeCamp",
            description:
                "Free interactive web development courses and projects.",
            url: "https://www.freecodecamp.org/learn/",
            type: "Interactive Course",
        },
        {
            title: "Web Development Full Course",
            description:
                "Free web development courses on YouTube.",
            url: "https://www.youtube.com/results?search_query=web+development+full+course",
            type: "YouTube",
        },
    ],

    "cloud computing": [
        {
            title: "AWS Skill Builder",
            description:
                "Official AWS training and learning resources.",
            url: "https://skillbuilder.aws/",
            type: "Course",
        },
        {
            title: "Microsoft Learn",
            description:
                "Free Microsoft cloud and technology learning paths.",
            url: "https://learn.microsoft.com/training/",
            type: "Course",
        },
        {
            title: "Google Cloud Skills Boost",
            description:
                "Hands-on Google Cloud labs and learning resources.",
            url: "https://www.cloudskillsboost.google/",
            type: "Course",
        },
        {
            title: "Cloud Computing Full Course",
            description:
                "Free cloud computing courses and tutorials.",
            url: "https://www.youtube.com/results?search_query=cloud+computing+full+course",
            type: "YouTube",
        },
    ],

    devops: [
        {
            title: "Boot.dev",
            description:
                "Hands-on backend and DevOps courses including Linux, Git, Docker, Kubernetes and AWS.",
            url: "https://www.boot.dev/courses",
            type: "Course",
        },
        {
            title: "Docker Documentation",
            description:
                "Official containerization guides and tutorials.",
            url: "https://docs.docker.com/",
            type: "Documentation",
        },
        {
            title: "Kubernetes Documentation",
            description:
                "Official Kubernetes learning resources.",
            url: "https://kubernetes.io/docs/home/",
            type: "Documentation",
        },
        {
            title: "DevOps Full Course",
            description:
                "Free DevOps courses and practical tutorials.",
            url: "https://www.youtube.com/results?search_query=DevOps+full+course",
            type: "YouTube",
        },
    ],

    "ci/cd": [
        {
            title: "GitHub Actions Documentation",
            description:
                "Official GitHub Actions automation and CI/CD documentation.",
            url: "https://docs.github.com/en/actions",
            type: "Documentation",
        },
        {
            title: "Full Stack Open - CI/CD",
            description:
                "Hands-on continuous integration and deployment material.",
            url: "https://fullstackopen.com/en/part11/",
            type: "Course",
        },
        {
            title: "CI/CD Full Course",
            description:
                "Free continuous integration and deployment tutorials.",
            url: "https://www.youtube.com/results?search_query=CI+CD+full+course",
            type: "YouTube",
        },
    ],
};

const getResourcesForSkills = (skills = []) => {
    const resources = [];

    const aliases = {
        html: "html",
        html5: "html",
        "semantic html": "html",
        "semantic html5": "html",
        css: "css",
        css3: "css",
        "css layouts": "css",
        "css layout": "css",
        javascript: "javascript",
        js: "javascript",
        "javascript es6": "javascript",
        "javascript es6+": "javascript",
        "modern javascript": "javascript",
        tailwind: "tailwind",
        "tailwind css": "tailwind",
        tailwindcss: "tailwind",
        react: "react",
        "react.js": "react",
        reactjs: "react",
        node: "node",
        "node.js": "node",
        nodejs: "node",
        typescript: "typescript",
        ts: "typescript",
        java: "java",
        "core java": "java",
        "spring boot": "spring boot",
        springboot: "spring boot",
        "spring security": "spring security",
        hibernate: "hibernate",
        "hibernate orm": "hibernate",
        jpa: "hibernate",
        mysql: "mysql",
        postgresql: "postgresql",
        postgres: "postgresql",
        python: "python",
        django: "django",
        "c++": "c++",
        csharp: "csharp",
        "c#": "csharp",
        ".net": ".net",
        dotnet: ".net",
        git: "git",
        docker: "docker",
        kubernetes: "kubernetes",
        angular: "angular",
        "angular.js": "angular",
        vue: "vue",
        "vue.js": "vue",
        svelte: "svelte",
        "next.js": "next.js",
        nextjs: "next.js",
        bootstrap: "bootstrap",
        express: "express",
        "express.js": "express",
        spring: "spring",
        "spring framework": "spring",
        flask: "flask",
        fastapi: "fastapi",
        laravel: "laravel",
        go: "go",
        golang: "go",
        rust: "rust",
        kotlin: "kotlin",
        swift: "swift",
        php: "php",
        mongodb: "mongodb",
        mongo: "mongodb",
        "mongo db": "mongodb",
        redis: "redis",
        sqlite: "sqlite",
        sql: "sql",
        aws: "aws",
        amazon: "aws",
        azure: "azure",
        gcp: "gcp",
        "google cloud": "gcp",
        terraform: "terraform",
        pytorch: "pytorch",
        tensorflow: "tensorflow",
        pandas: "pandas",
        "machine learning": "machine learning",
        ml: "machine learning",
        "c programming": "c",
        "data structures": "data structures",
        "dsa": "dsa",
        "algorithms": "algorithms",
        "object-oriented programming": "object oriented programming",
        "object oriented programming": "object oriented programming",
        "oop": "object oriented programming",
        "linux": "linux",
        "github": "github",
        "rest": "rest",
        "rest api": "rest api",
        "restful api": "rest api",
        "http": "http",
        "graphql": "graphql",
        "elasticsearch": "elasticsearch",
        "kafka": "kafka",
        "apache kafka": "kafka",
        "rabbitmq": "rabbitmq",
        "maven": "maven",
        "gradle": "gradle",
        "junit": "junit",
        "junit 5": "junit",
        "jest": "jest",
        "vitest": "vitest",
        "playwright": "playwright",
        "cypress": "cypress",
        "flutter": "flutter",
        "dart": "dart",
        "android": "android",
        "android development": "android",
        "react native": "react native",
        "numpy": "numpy",
        "scikit-learn": "scikit",
        "sklearn": "scikit",
        "data science": "data science",
        "deep learning": "deep learning",
        "generative ai": "generative ai",
        "generative artificial intelligence": "generative ai",
        "llm": "llm",
        "large language models": "llm",
        "rag": "rag",
        "retrieval augmented generation": "rag",
        "system design": "system design",
        "software engineering": "software engineering",
        "full stack": "full stack",
        "full-stack": "full stack",
        "full stack development": "full stack",
        "web development": "web development",
        "cloud": "cloud computing",
        "cloud computing": "cloud computing",
        "devops": "devops",
        "ci/cd": "ci/cd",
        "cicd": "ci/cd",
        "continuous integration": "ci/cd",
        "continuous deployment": "ci/cd",
    };
    for (const skill of skills) {
        const normalizedSkill = skill.toLowerCase().trim();
        const catalogKey = aliases[normalizedSkill] || normalizedSkill;
        const matches = resourceCatalog[catalogKey];
        if (!matches) continue;
        for (const resource of matches) {
            if (!resources.some((item) => item.url === resource.url)) {
                resources.push(resource);
            }
        }
    }
    return resources.slice(0, 8);
};

module.exports = {
    resourceCatalog,
    getResourcesForSkills,
};
