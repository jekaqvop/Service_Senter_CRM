use ServiceSenterDb;

INSERT INTO [dbo].[Devices] ([TypeDevice], [Model], [SerialNumber], [Manufacturer]) 
VALUES 
    (N'Телефон', 'Samsung Galaxy S21', 'SN123456', 'Samsung'),
    (N'Ноутбук', 'HP Pavilion', 'SN789012', 'HP'),
    (N'Планшет', 'iPad Air', 'SN345678', 'Apple'),
    (N'Телефон', 'iPhone 12', 'SN901234', 'Apple'),
    (N'Компьютер', 'Dell OptiPlex', 'SN567890', 'Dell'),
    (N'Телевизор', 'LG OLED55C1', 'SN123789', 'LG'),
    (N'Телефон', 'Xiaomi Redmi Note 10', 'SN890123', 'Xiaomi'),
    (N'Планшет', 'Samsung Galaxy Tab S7', 'SN234567', 'Samsung'),
    (N'Компьютер', 'Lenovo ThinkCentre', 'SN456789', 'Lenovo'),
    (N'Телевизор', 'Sony Bravia X90J', 'SN789012', 'Sony'),
    (N'Телефон', 'Google Pixel 5', 'SN345678', 'Google'),
    (N'Ноутбук', 'Acer Aspire 5', 'SN901234', 'Acer'),
    (N'Планшет', 'Huawei MatePad Pro', 'SN567890', 'Huawei'),
    (N'Телевизор', 'TCL 55C715', 'SN123789', 'TCL'),
    (N'Телефон', 'OnePlus 9 Pro', 'SN890123', 'OnePlus'),
    (N'Компьютер', 'ASUS ROG Strix G15', 'SN234567', 'ASUS'),
    (N'Ноутбук', 'MSI Stealth 15M', 'SN456789', 'MSI'),
    (N'Планшет', 'Amazon Fire HD 10', 'SN789012', 'Amazon'),
    (N'Телевизор', 'Hisense U8G', 'SN345678', 'Hisense'),
    (N'Телефон', 'Motorola Moto G Power', 'SN901234', 'Motorola');

delete from Devices;

INSERT INTO [dbo].[Users] ([Login], [UserName], [Email], [PhoneNumber], [IdRole])
VALUES (N'IvanIvanov1983', N'Иванов Иван', 'ivanov_ivan@example.com', '+375291234567', 1),
       (N'Petrova1985', N'Петрова Анна', 'petrova_anna@example.com', '+375331234567', 1),
       (N'AlexSidorov', N'Сидоров Александр', 'sidorov_alex@example.com', '+375441234567', 1),
       (N'ElenaKuznetsova', N'Кузнецова Елена', 'kuznetsova_elena@example.com', '+375251234567', 1),
       (N'AdminUser', N'Админов Петр', 'admin@example.com', '+375171234567', 2),
       (N'MikhailMaster', N'Мастеров Михаил', 'master@example.com', '+375551234567', 3),
       (N'NikolayIvanov', N'Иванов Николай', 'nikolay_ivanov@example.com', '+375631234567', 1),
       (N'MariaSergeeva', N'Сергеева Мария', 'sergeeva_maria@example.com', '+375731234567', 1),
       (N'MaximAdmin', N'Админ Максим', 'maxim_admin@example.com', '+375441234567', 2),
       (N'SvetlanaPetrova', N'Петрова Светлана', 'svetlana_petrova@example.com', '+375291234567', 1),
       (N'IgorSidorov', N'Сидоров Игорь', 'igor_sidorov@example.com', '+375331234567', 1),
       (N'MasterUser', N'Мастеров Иван', 'master@example.com', '+375551234567', 3),
       (N'ElenaKuzmina', N'Кузьмина Елена', 'kuzmina_elena@example.com', '+375251234567', 1),
       (N'IvanAdmin', N'Админов Иван', 'admin@example.com', '+375171234567', 2),
       (N'SergeyMaster', N'Мастеров Сергей', 'master@example.com', '+375551234567', 3),
       (N'OlgaIvanova', N'Иванова Ольга', 'olga_ivanova@example.com', '+375631234567', 1),
       (N'AnnaSergeeva', N'Сергеева Анна', 'sergeeva_anna@example.com', '+375731234567', 1),
       (N'IvanAdmin1', N'Админов Иван', 'admin1@example.com', '+375441234567', 2),
       (N'MariaPetrova', N'Петрова Мария', 'maria_petrova@example.com', '+375291234567', 1),
       (N'IgorSidorov1', N'Сидоров Игорь', 'igor_sidorov1@example.com', '+375331234567', 1),
       (N'MasterUser1', N'Мастеров Иван', 'master1@example.com', '+375551234567', 3);

--клиенты
INSERT INTO [dbo].[Users] ([Login], [UserName], [Email], [PhoneNumber], [IdRole])
VALUES ('ViktorSmirnov1991', 'Смирнов Виктор', 'smirnov_viktor@example.com', '+375331234567', 1),
       ('NataliaKuznetsova1986', 'Кузнецова Наталья', 'kuznetsova_natalia@example.com', '+375251234567', 1),
       ('IgorPopov1993', 'Попов Игорь', 'popov_igor@example.com', '+375291234567', 1),
       ('TatianaIvanova1981', 'Иванова Татьяна', 'ivanova_tatiana@example.com', '+375441234567', 1),
       ('AndreySergeev1988', 'Сергеев Андрей', 'sergeev_andrey@example.com', '+375331234567', 1),
       ('EkaterinaKozlova1994', 'Козлова Екатерина', 'kozlova_ekaterina@example.com', '+375251234567', 1),
       ('PavelVasiliev1983', 'Васильев Павел', 'vasiliev_pavel@example.com', '+375291234567', 1),
       ('SvetlanaIvanova1990', 'Иванова Светлана', 'ivanova_svetlana@example.com', '+375441234567', 1),
       ('ArtemSidorov1985', 'Сидоров Артем', 'sidorov_artem@example.com', '+375331234567', 1),
       ('MariaSmirnova1982', 'Смирнова Мария', 'smirnova_maria@example.com', '+375251234567', 1),
       ('DmitryPopov1997', 'Попов Дмитрий', 'popov_dmitry@example.com', '+375291234567', 1),
       ('ElenaKuznetsova1989', 'Кузнецова Елена', 'kuznetsova_elena@example.com', '+375441234567', 1),
       ('SergeyIvanov1984', 'Иванов Сергей', 'ivanov_sergey@example.com', '+375331234567', 1),
       ('AnnaSidorova1992', 'Сидорова Анна', 'sidorova_anna@example.com', '+375251234567', 1),
       ('MaximSmirnov1987', 'Смирнов Максим', 'smirnov_maxim@example.com', '+375291234567', 1),
       ('OlgaPopova1995', 'Попова Ольга', 'popova_olga@example.com', '+375441234567', 1),
       ('IvanKuznetsov1983', 'Кузнецов Иван', 'kuznetsov_ivan@example.com', '+375331234567', 1),
       ('MariaIvanova1991', 'Иванова Мария', 'ivanova_maria@example.com', '+375251234567', 1),
       ('AlexSidorov1986', 'Сидоров Алексей', 'sidorov_alex@example.com', '+375291234567', 1),
       ('ElenaSmirnova1984', 'Смирнова Елена', 'smirnova_elena@example.com', '+375441234567', 1),
       ('DmitryKuznetsov1993', 'Кузнецов Дмитрий', 'kuznetsov_dmitry@example.com', '+375331234567', 1),
       ('OlgaVasilieva1992', 'Васильева Ольга', 'vasilieva_olga@example.com', '+375251234567', 1),
       ('SergeyPopov1985', 'Попов Сергей', 'popov_sergey@example.com', '+375291234567', 1),
       ('AnnaKozlova1990', 'Козлова Анна', 'kozlova_anna@example.com', '+375441234567', 1),
       ('MaximIvanov1988', 'Иванов Максим', 'ivanov_maxim@example.com', '+375331234567', 1),
       ('ElenaSergeeva1987', 'Сергеева Елена', 'sergeeva_elena@example.com', '+375251234567', 1),
       ('ViktorSmirnov1989', 'Смирнов Виктор', 'smirnov_viktor@example.com', '+375291234567', 1),
       ('NataliaKuznetsova1984', 'Кузнецова Наталья', 'kuznetsova_natalia@example.com', '+375441234567', 1),
       ('IgorPopov1992', 'Попов Игорь', 'popov_igor@example.com', '+375331234567', 1),
       ('TatianaIvanova1987', 'Иванова Татьяна', 'ivanova_tatiana@example.com', '+375251234567', 1),
       ('AndreySergeev1995', 'Сергеев Андрей', 'sergeev_andrey@example.com', '+375291234567', 1),
       ('EkaterinaKozlova1983', 'Козлова Екатерина', 'kozlova_ekaterina@example.com', '+375441234567', 1),
       ('PavelVasiliev1990', 'Васильев Павел', 'vasiliev_pavel@example.com', '+375331234567', 1),
       ('SvetlanaIvanova1986', 'Иванова Светлана', 'ivanova_svetlana@example.com', '+375251234567', 1),
       ('ArtemSidorov1982', 'Сидоров Артем', 'sidorov_artem@example.com', '+375291234567', 1),
       ('MariaSmirnova1991', 'Смирнова Мария', 'smirnova_maria@example.com', '+375441234567', 1),
       ('DmitryPopov1985', 'Попов Дмитрий', 'popov_dmitry@example.com', '+375331234567', 1),
       ('ElenaKuznetsova1993', 'Кузнецова Елена', 'kuznetsova_elena@example.com', '+375251234567', 1),
       ('SergeyIvanov1981', 'Иванов Сергей', 'ivanov_sergey@example.com', '+375291234567', 1),
       ('AnnaSidorova1989', 'Сидорова Анна', 'sidorova_anna@example.com', '+375441234567', 1),
       ('MaximSmirnov1987', 'Смирнов Максим', 'smirnov_maxim@example.com', '+375331234567', 1),
       ('OlgaPopova1995', 'Попова Ольга', 'popova_olga@example.com', '+375251234567', 1),
       ('IvanKuznetsov1984', 'Кузнецов Иван', 'kuznetsov_ivan@example.com', '+375291234567', 1),
       ('MariaIvanova1992', 'Иванова Мария', 'ivanova_maria@example.com', '+375441234567', 1),
       ('AlexSidorov1983', 'Сидоров Алексей', 'sidorov_alex@example.com', '+375331234567', 1),
       ('ElenaSmirnova1991', 'Смирнова Елена', 'smirnova_elena@example.com', '+375251234567', 1),
       ('DmitryKuznetsov1988', 'Кузнецов Дмитрий', 'kuznetsov_dmitry@example.com', '+375291234567', 1),
       ('OlgaVasilieva1990', 'Васильева Ольга', 'vasilieva_olga@example.com', '+375441234567', 1),
       ('SergeyPopov1987', 'Попов Сергей', 'popov_sergey@example.com', '+375331234567', 1),
       ('AnnaKozlova1985', 'Козлова Анна', 'kozlova_anna@example.com', '+375251234567', 1),
       ('MaximIvanov1993', 'Иванов Максим', 'ivanov_maxim@example.com', '+375291234567', 1),
       ('ElenaSergeeva1992', 'Сергеева Елена', 'sergeeva_elena@example.com', '+375441234567', 1),
       ('ViktorSmirnov1989', 'Смирнов Виктор', 'smirnov_viktor@example.com', '+375331234567', 1),
       ('NataliaKuznetsova1984', 'Кузнецова Наталья', 'kuznetsova_natalia@example.com', '+375251234567', 1),
       ('IgorPopov1992', 'Попов Игорь', 'popov_igor@example.com', '+375291234567', 1),
       ('TatianaIvanova1987', 'Иванова Татьяна', 'ivanova_tatiana@example.com', '+375441234567', 1);

INSERT INTO [dbo].[Users] ([Login], [UserName], [Email], [PhoneNumber], [IdRole]) values
	   (N'AndreySergeev1995', N'Сергеев Андрей', 'sergeev_andrey@example.com', '+375331234567', 1),
       (N'EkaterinaKozlova1983', N'Козлова Екатерина', 'kozlova_ekaterina@example.com', '+375251234567', 1),
       (N'PavelVasiliev1990', N'Васильев Павел', 'vasiliev_pavel@example.com', '+375291234567', 1),
       (N'SvetlanaIvanova1986', N'Иванова Светлана', 'ivanova_svetlana@example.com', '+375441234567', 1),
       (N'ArtemSidorov1982', N'Сидоров Артем', 'sidorov_artem@example.com', '+375331234567', 1),
       (N'MariaSmirnova1991', N'Смирнова Мария', 'smirnova_maria@example.com', '+375251234567', 1),
       (N'DmitryPopov1985', N'Попов Дмитрий', 'popov_dmitry@example.com', '+375291234567', 1),
       (N'ElenaKuznetsova1993', N'Кузнецова Елена', 'kuznetsova_elena@example.com', '+375441234567', 1),
       (N'SergeyIvanov1981', N'Иванов Сергей', 'ivanov_sergey@example.com', '+375331234567', 1),
       (N'AnnaSidorova1989', N'Сидорова Анна', 'sidorova_anna@example.com', '+375251234567', 1),
       (N'MaximSmirnov1987', N'Смирнов Максим', 'smirnov_maxim@example.com', '+375291234567', 1),
       (N'OlgaPopova1995', N'Попова Ольга', 'popova_olga@example.com', '+375441234567', 1),
       (N'IvanKuznetsov1984', N'Кузнецов Иван', 'kuznetsov_ivan@example.com', '+375331234567', 1),
       (N'MariaIvanova1992', N'Иванова Мария', 'ivanova_maria@example.com', '+375441234567', 1),
       (N'AlexSidorov1983', N'Сидоров Алексей', 'sidorov_alex@example.com', '+375331234567', 1),
       (N'ElenaSmirnova1991', N'Смирнова Елена', 'smirnova_elena@example.com', '+375251234567', 1),
       (N'DmitryKuznetsov1988', N'Кузнецов Дмитрий', 'kuznetsov_dmitry@example.com', '+375291234567', 1),
       (N'OlgaVasilieva1990', N'Васильева Ольга', 'vasilieva_olga@example.com', '+375441234567', 1),
       (N'SergeyPopov1987', N'Попов Сергей', 'popov_sergey@example.com', '+375331234567', 1),
       (N'AnnaKozlova1985', N'Козлова Анна', 'kozlova_anna@example.com', '+375251234567', 1),
       (N'MaximIvanov1993', N'Иванов Максим', 'ivanov_maxim@example.com', '+375291234567', 1),
       (N'ElenaSergeeva1992', N'Сергеева Елена', 'sergeeva_elena@example.com', '+375441234567', 1),
       (N'ViktorSmirnov1989', N'Смирнов Виктор', 'smirnov_viktor@example.com', '+375331234567', 1),
       (N'NataliaKuznetsova1984', N'Кузнецова Наталья', 'kuznetsova_natalia@example.com', '+375251234567', 1),
       (N'IgorPopov1992', N'Попов Игорь', 'popov_igor@example.com', '+375291234567', 1),
       (N'TatianaIvanova1987', N'Иванова Татьяна', 'ivanova_tatiana@example.com', '+375441234567', 1),
       (N'AndreySergeev1995', N'Сергеев Андрей', 'sergeev_andrey@example.com', '+375331234567', 1),
       (N'EkaterinaKozlova1983', N'Козлова Екатерина', 'kozlova_ekaterina@example.com', '+375251234567', 1),
       (N'PavelVasiliev1990', N'Васильев Павел', 'vasiliev_pavel@example.com', '+375291234567', 1),
       (N'SvetlanaIvanova1986', N'Иванова Светлана', 'ivanova_svetlana@example.com', '+375441234567', 1),
       (N'ArtemSidorov1982', N'Сидоров Артем', 'sidorov_artem@example.com', '+375331234567', 1),
       (N'MariaSmirnova1991', N'Смирнова Мария', 'smirnova_maria@example.com', '+375251234567', 1),
       (N'DmitryPopov1985', N'Попов Дмитрий', 'popov_dmitry@example.com', '+375291234567', 1),
       (N'ElenaKuznetsova1993', N'Кузнецова Елена', 'kuznetsova_elena@example.com', '+375441234567', 1);


INSERT INTO [dbo].[Rooms] ([Name])
VALUES (N'Комната Обсуждений'),
       (N'Чат для Вопросов'),
       (N'Групповой Чат'),
       (N'Приватный Чат'),
       (N'Комната Деловых Переговоров'),
       (N'Чат для Творчества'),
       (N'Комната Отдыха'),
       (N'Общий Чат'),
       (N'Чат для Игр'),
       (N'Группа Поддержки'),
       (N'Комната Совещаний'),
       (N'Чат для Новостей'),
       (N'Комната Обучения'),
       (N'Чат для Знакомств'),
       (N'Чат для Развлечений'),
       (N'Комната Планирования'),
       (N'Общий Чат для Коллег'),
       (N'Группа Друзей'),
       (N'Комната Тайного Общения'),
       (N'Чат для Информации');

INSERT INTO [dbo].[RoomUsers] ([UserId], [RoomId])
VALUES ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 19), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 2)),
       ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 8)),
       ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 2), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 14)),
       ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 3), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 10)),
       ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 7)),
       ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 2), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 3));

	
INSERT INTO [dbo].[Messages] ([UserId], [RoomId], [MessageText], [MessageImage], [TimeSend]) 
VALUES 
    (1, 1, N'Привет!', NULL, '2023-05-15 10:00:00'),
    (1, 2, N'Как дела?', NULL, '2023-05-15 11:30:00'),
    (2, 1, N'Привет! Чем могу помочь?', NULL, '2023-05-25 12:15:00'),
    (2, 3, N'Здравствуйте! У вас вопросы по заказу?', NULL, '2023-05-15 14:00:00'),
    (3, 2, N'Добрый день! У меня проблема с устройством.', NULL, '2023-05-26 09:30:00'),
    (3, 3, N'Как долго будет выполняться ремонт?', NULL, '2023-05-16 11:00:00'),
    (4, 1, N'Здравствуйте! Я хотел бы записаться на ремонт.', NULL, '2023-05-26 13:45:00'),
    (4, 2, N'Какие услуги вы предоставляете?', NULL, '2023-05-17 08:30:00'),
    (5, 3, N'Спасибо за быстрый ответ!', NULL, '2023-05-17 10:15:00'),
    (5, 1, N'Когда можно будет забрать устройство?', NULL, '2023-05-17 12:00:00'),
    (6, 2, N'Мне нужна помощь с настройкой устройства.', NULL, '2023-05-17 14:30:00'),
    (6, 3, N'Какие варианты оплаты доступны?', NULL, '2023-05-18 09:45:00'),
    (7, 1, N'У меня проблемы с интернет-соединением.', NULL, '2023-05-18 11:15:00'),
    (7, 2, N'Какие документы нужны для ремонта?', NULL, '2023-05-18 13:00:00'),
    (8, 3, N'Спасибо за информацию!', NULL, '2023-05-19 08:30:00'),
    (8, 1, N'Какой срок гарантии на ремонт?', NULL, '2023-05-19 10:00:00'),
    (9, 2, N'У меня проблема с зарядкой устройства.', NULL, '2023-05-19 12:45:00'),
    (9, 3, N'Какие дополнительные услуги вы предлагаете?', NULL, '2023-05-19 14:15:00'),
    (10, 1, N'У меня сломался экран на телефоне.', NULL, '2023-05-10 09:30:00'),
    (10, 2, N'Какие методы оплаты принимаются?', NULL, '2023-05-10 11:00:00');


	select *from HistoryChangesOrders

	-- Заполнение таблицы Services
	INSERT INTO [dbo].[Services] ([Title], [Description], [Price])
	VALUES (N'Диагностика устройства', N'Диагностика устройства для выявления неисправностей и определения причины поломки. Включает проверку аппаратной и программной составляющих.', 25.00),
		   (N'Замена дисплея', N'Замена поврежденного дисплея на вашем устройстве. Включает демонтаж старого дисплея и установку нового.', 80.00),
		   (N'Ремонт системной платы', N'Ремонт системной платы устройства. Включает замену неисправных компонентов и восстановление работоспособности.', 120.00),
		   (N'Замена аккумулятора', N'Замена изношенного или поврежденного аккумулятора на вашем устройстве. Включает демонтаж старого аккумулятора и установку нового.', 40.00),
		   (N'Установка программного обеспечения', N'Установка и настройка программного обеспечения на вашем устройстве. Включает установку операционной системы и необходимых приложений.', 30.00),
		   (N'Чистка от пыли и грязи', N'Чистка устройства от пыли и грязи для поддержания его работоспособности и производительности.', 15.00),
		   (N'Восстановление данных', N'Восстановление удаленных или поврежденных данных на вашем устройстве. Включает использование специализированных программ и техник восстановления.', 60.00),
		   (N'Настройка сетевых подключений', N'Настройка и установка сетевых подключений на вашем устройстве. Включает подключение к Wi-Fi, настройку сетевых параметров и проверку связи.', 25.00),
		   (N'Замена разъемов', N'Замена поврежденных или неисправных разъемов (USB, HDMI, аудио и т. д.) на вашем устройстве. Включает демонтаж старого разъема и установку нового.', 35.00),
		   (N'Ремонт клавиатуры', N'Ремонт поврежденной или неисправной клавиатуры на вашем устройстве. Включает замену клавиш и ремонт электрических контактов.', 50.00);

	-- Заполнение таблицы ServicesPerformeds


select *from Services 
delete from orders

DECLARE @i INT = 1;
WHILE @i <= 200
BEGIN
    DECLARE @previousDate DATE = '2022-06-01';

    INSERT INTO [dbo].[Orders] ([IdDevice], [IdMaster], [IdClient], [Status], [ReasonContacting], [Equipment], [Appearance], [IsUrgently], [Date_acceptance], [Repair_start_date], [Repair_completion_date], [Date_issue], [Description], [PriceOrder])
    SELECT 
        (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = FLOOR(RAND() * 20) + 1),
        (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users WHERE IdRole = 3) AS foo WHERE rownumber = FLOOR(RAND() * 4) + 1),
        (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users WHERE IdRole = 1) AS foo WHERE rownumber = FLOOR(RAND() * 106) + 1),
        (SELECT TOP 1 Description FROM (
            SELECT N'Заказ завершён' AS Description UNION ALL
            SELECT N'Заказ принят' AS Description UNION ALL
            SELECT N'Начат ремонт' AS Description UNION ALL
            SELECT N'На согласовании' AS Description UNION ALL
            SELECT N'В ожидании запчастей' AS Description UNION ALL
            SELECT N'Продолжается ремонт' AS Description UNION ALL
            SELECT N'Клиент отказался от ремонта' AS Description UNION ALL
            SELECT N'Ремонт закончен' AS Description 
        ) AS d ORDER BY NEWID()),
        (SELECT TOP 1 Description FROM (
            SELECT N'Проблема с разъемом питания' AS Description UNION ALL
            SELECT N'Неисправность в сетевом адаптере' AS Description UNION ALL
            SELECT N'Проблемы с зарядкой аккумулятора' AS Description UNION ALL
            SELECT N'Не работает клавиатура' AS Description UNION ALL
            SELECT N'Проблема с дисплеем' AS Description UNION ALL
            SELECT N'Замена жесткого диска' AS Description UNION ALL
            SELECT N'Не загружается операционная система' AS Description UNION ALL
            SELECT N'Проблема с звуком' AS Description UNION ALL
            SELECT N'Вирусная атака' AS Description UNION ALL
            SELECT N'Проблемы с Wi-Fi соединением' AS Description
        ) AS d ORDER BY NEWID()),
        (SELECT TOP 1 [Equipment] FROM (
            SELECT N'Без дополнений' AS [Equipment] UNION ALL
            SELECT N'Сумка' AS [Equipment] UNION ALL
            SELECT N'Зарядное устройство' AS [Equipment] UNION ALL
            SELECT N'Чехол' AS [Equipment] UNION ALL
            SELECT N'Сим-карта' AS [Equipment] UNION ALL
            SELECT N'аккумулятор' AS [Equipment]
        ) AS e ORDER BY NEWID()),
        (SELECT TOP 1 [Appearance] FROM (
            SELECT N'Царапины на корпусе' AS [Appearance] UNION ALL
            SELECT N'Поврежденный экран' AS [Appearance] UNION ALL
            SELECT N'Не работают кнопки' AS [Appearance] UNION ALL
            SELECT N'Потертости' AS [Appearance] UNION ALL
            SELECT N'Поврежденный разъем' AS [Appearance] UNION ALL
            SELECT N'Проблемы с звуком' AS [Appearance]
        ) AS a ORDER BY NEWID()),
        (SELECT CONVERT(BIT, FLOOR(RAND() * 2))),
        DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, @previousDate, '2023-05-24'), 0), @previousDate),
        DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, @previousDate, '2023-05-24'), 0), DATEADD(DAY, 1, @previousDate)),
        DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, @previousDate, '2023-05-24'), 0), DATEADD(DAY, 2, @previousDate)),
        DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, @previousDate, '2023-05-24'), 0), DATEADD(DAY, 3, @previousDate)),
        (SELECT TOP 1 Description FROM (
            SELECT N'Проблема с разъемом питания' AS Description UNION ALL
            SELECT N'Неисправность в сетевом адаптере' AS Description UNION ALL
            SELECT N'Проблемы с зарядкой аккумулятора' AS Description UNION ALL
            SELECT N'Не работает клавиатура' AS Description UNION ALL
            SELECT N'Проблема с дисплеем' AS Description UNION ALL
            SELECT N'Замена жесткого диска' AS Description UNION ALL
            SELECT N'Не загружается операционная система' AS Description UNION ALL
            SELECT N'Проблема с звуком' AS Description UNION ALL
            SELECT N'Вирусная атака' AS Description UNION ALL
            SELECT N'Проблемы с Wi-Fi соединением' AS Description
        ) AS d ORDER BY NEWID()),
        ROUND(RAND() * 100 + 1, 2)
    FROM
        (SELECT RAND() AS random) AS r
    CROSS JOIN
        (SELECT RAND() AS random) AS r2;

    SET @i = @i + 1;
END;



select *from ServicesPerformeds;
insert into ServicesPerformeds(IdOrder, IdService) values(129, 1);