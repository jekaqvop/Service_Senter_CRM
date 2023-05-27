use ServiceSenterDb;

INSERT INTO [dbo].[Devices] ([TypeDevice], [Model], [SerialNumber], [Manufacturer]) 
VALUES 
    ('Телефон', 'Samsung Galaxy S21', 'SN123456', 'Samsung'),
    ('Ноутбук', 'HP Pavilion', 'SN789012', 'HP'),
    ('Планшет', 'iPad Air', 'SN345678', 'Apple'),
    ('Телефон', 'iPhone 12', 'SN901234', 'Apple'),
    ('Компьютер', 'Dell OptiPlex', 'SN567890', 'Dell'),
    ('Телевизор', 'LG OLED55C1', 'SN123789', 'LG'),
    ('Телефон', 'Xiaomi Redmi Note 10', 'SN890123', 'Xiaomi'),
    ('Планшет', 'Samsung Galaxy Tab S7', 'SN234567', 'Samsung'),
    ('Компьютер', 'Lenovo ThinkCentre', 'SN456789', 'Lenovo'),
    ('Телевизор', 'Sony Bravia X90J', 'SN789012', 'Sony'),
    ('Телефон', 'Google Pixel 5', 'SN345678', 'Google'),
    ('Ноутбук', 'Acer Aspire 5', 'SN901234', 'Acer'),
    ('Планшет', 'Huawei MatePad Pro', 'SN567890', 'Huawei'),
    ('Телевизор', 'TCL 55C715', 'SN123789', 'TCL'),
    ('Телефон', 'OnePlus 9 Pro', 'SN890123', 'OnePlus'),
    ('Компьютер', 'ASUS ROG Strix G15', 'SN234567', 'ASUS'),
    ('Ноутбук', 'MSI Stealth 15M', 'SN456789', 'MSI'),
    ('Планшет', 'Amazon Fire HD 10', 'SN789012', 'Amazon'),
    ('Телевизор', 'Hisense U8G', 'SN345678', 'Hisense'),
    ('Телефон', 'Motorola Moto G Power', 'SN901234', 'Motorola');

delete from Devices;

INSERT INTO [dbo].[Messages] ([UserId], [RoomId], [MessageText], [MessageImage], [TimeSend]) 
VALUES 
    (1, 1, 'Привет!', NULL, '2023-05-15 10:00:00'),
    (1, 2, 'Как дела?', NULL, '2023-05-15 11:30:00'),
    (2, 1, 'Привет! Чем могу помочь?', NULL, '2023-05-25 12:15:00'),
    (2, 3, 'Здравствуйте! У вас вопросы по заказу?', NULL, '2023-05-15 14:00:00'),
    (3, 2, 'Добрый день! У меня проблема с устройством.', NULL, '2023-05-26 09:30:00'),
    (3, 3, 'Как долго будет выполняться ремонт?', NULL, '2023-05-16 11:00:00'),
    (4, 1, 'Здравствуйте! Я хотел бы записаться на ремонт.', NULL, '2023-05-26 13:45:00'),
    (4, 2, 'Какие услуги вы предоставляете?', NULL, '2023-05-17 08:30:00'),
    (5, 3, 'Спасибо за быстрый ответ!', NULL, '2023-05-17 10:15:00'),
    (5, 1, 'Когда можно будет забрать устройство?', NULL, '2023-05-17 12:00:00'),
    (6, 2, 'Мне нужна помощь с настройкой устройства.', NULL, '2023-05-17 14:30:00'),
    (6, 3, 'Какие варианты оплаты доступны?', NULL, '2023-05-18 09:45:00'),
    (7, 1, 'У меня проблемы с интернет-соединением.', NULL, '2023-05-18 11:15:00'),
    (7, 2, 'Какие документы нужны для ремонта?', NULL, '2023-05-18 13:00:00'),
    (8, 3, 'Спасибо за информацию!', NULL, '2023-05-19 08:30:00'),
    (8, 1, 'Какой срок гарантии на ремонт?', NULL, '2023-05-19 10:00:00'),
    (9, 2, 'У меня проблема с зарядкой устройства.', NULL, '2023-05-19 12:45:00'),
    (9, 3, 'Какие дополнительные услуги вы предлагаете?', NULL, '2023-05-19 14:15:00'),
    (10, 1, 'У меня сломался экран на телефоне.', NULL, '2023-05-10 09:30:00'),
    (10, 2, 'Какие методы оплаты принимаются?', NULL, '2023-05-10 11:00:00');

INSERT INTO [dbo].[Users] ([Login], [UserName], [Email], [PhoneNumber], [IdRole])
VALUES ('IvanIvanov1983', 'Иванов Иван', 'ivanov_ivan@example.com', '+375291234567', 1),
       ('Petrova1985', 'Петрова Анна', 'petrova_anna@example.com', '+375331234567', 1),
       ('AlexSidorov', 'Сидоров Александр', 'sidorov_alex@example.com', '+375441234567', 1),
       ('ElenaKuznetsova', 'Кузнецова Елена', 'kuznetsova_elena@example.com', '+375251234567', 1),
       ('AdminUser', 'Админов Петр', 'admin@example.com', '+375171234567', 2),
       ('MikhailMaster', 'Мастеров Михаил', 'master@example.com', '+375551234567', 3),
       ('NikolayIvanov', 'Иванов Николай', 'nikolay_ivanov@example.com', '+375631234567', 1),
       ('MariaSergeeva', 'Сергеева Мария', 'sergeeva_maria@example.com', '+375731234567', 1),
       ('MaximAdmin', 'Админ Максим', 'maxim_admin@example.com', '+375441234567', 2),
       ('SvetlanaPetrova', 'Петрова Светлана', 'svetlana_petrova@example.com', '+375291234567', 1),
       ('IgorSidorov', 'Сидоров Игорь', 'igor_sidorov@example.com', '+375331234567', 1),
       ('MasterUser', 'Мастеров Иван', 'master@example.com', '+375551234567', 3),
       ('ElenaKuzmina', 'Кузьмина Елена', 'kuzmina_elena@example.com', '+375251234567', 1),
       ('IvanAdmin', 'Админов Иван', 'admin@example.com', '+375171234567', 2),
       ('SergeyMaster', 'Мастеров Сергей', 'master@example.com', '+375551234567', 3),
       ('OlgaIvanova', 'Иванова Ольга', 'olga_ivanova@example.com', '+375631234567', 1),
       ('AnnaSergeeva', 'Сергеева Анна', 'sergeeva_anna@example.com', '+375731234567', 1),
       ('IvanAdmin1', 'Админов Иван', 'admin1@example.com', '+375441234567', 2),
       ('MariaPetrova', 'Петрова Мария', 'maria_petrova@example.com', '+375291234567', 1),
       ('IgorSidorov1', 'Сидоров Игорь', 'igor_sidorov1@example.com', '+375331234567', 1),
       ('MasterUser1', 'Мастеров Иван', 'master1@example.com', '+375551234567', 3);

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
	   ('AndreySergeev1995', 'Сергеев Андрей', 'sergeev_andrey@example.com', '+375331234567', 1),
       ('EkaterinaKozlova1983', 'Козлова Екатерина', 'kozlova_ekaterina@example.com', '+375251234567', 1),
       ('PavelVasiliev1990', 'Васильев Павел', 'vasiliev_pavel@example.com', '+375291234567', 1),
       ('SvetlanaIvanova1986', 'Иванова Светлана', 'ivanova_svetlana@example.com', '+375441234567', 1),
       ('ArtemSidorov1982', 'Сидоров Артем', 'sidorov_artem@example.com', '+375331234567', 1),
       ('MariaSmirnova1991', 'Смирнова Мария', 'smirnova_maria@example.com', '+375251234567', 1),
       ('DmitryPopov1985', 'Попов Дмитрий', 'popov_dmitry@example.com', '+375291234567', 1),
       ('ElenaKuznetsova1993', 'Кузнецова Елена', 'kuznetsova_elena@example.com', '+375441234567', 1),
       ('SergeyIvanov1981', 'Иванов Сергей', 'ivanov_sergey@example.com', '+375331234567', 1),
       ('AnnaSidorova1989', 'Сидорова Анна', 'sidorova_anna@example.com', '+375251234567', 1),
       ('MaximSmirnov1987', 'Смирнов Максим', 'smirnov_maxim@example.com', '+375291234567', 1),
       ('OlgaPopova1995', 'Попова Ольга', 'popova_olga@example.com', '+375441234567', 1),
       ('IvanKuznetsov1984', 'Кузнецов Иван', 'kuznetsov_ivan@example.com', '+375331234567', 1),
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
       ('TatianaIvanova1987', 'Иванова Татьяна', 'ivanova_tatiana@example.com', '+375441234567', 1),
       ('AndreySergeev1995', 'Сергеев Андрей', 'sergeev_andrey@example.com', '+375331234567', 1),
       ('EkaterinaKozlova1983', 'Козлова Екатерина', 'kozlova_ekaterina@example.com', '+375251234567', 1),
       ('PavelVasiliev1990', 'Васильев Павел', 'vasiliev_pavel@example.com', '+375291234567', 1),
       ('SvetlanaIvanova1986', 'Иванова Светлана', 'ivanova_svetlana@example.com', '+375441234567', 1),
       ('ArtemSidorov1982', 'Сидоров Артем', 'sidorov_artem@example.com', '+375331234567', 1),
       ('MariaSmirnova1991', 'Смирнова Мария', 'smirnova_maria@example.com', '+375251234567', 1),
       ('DmitryPopov1985', 'Попов Дмитрий', 'popov_dmitry@example.com', '+375291234567', 1),
       ('ElenaKuznetsova1993', 'Кузнецова Елена', 'kuznetsova_elena@example.com', '+375441234567', 1);



INSERT INTO [dbo].[Orders] ([IdDevice], [IdMaster], [IdClient], [Status], [Date_acceptance], [Repair_start_date], [Repair_completion_date], [Date_issue], [Description], [PriceOrder]) 
VALUES 
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 1), 
	'Заказ принят', '2023-04-01 10:00:00', NULL, NULL, NULL, 'Не включается', 100.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 2), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 2), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 2), 
	 'Начат ремонт', '2023-04-05 11:30:00', '2023-04-07 12:00:00', NULL, NULL, 'Требуется замена жесткого диска', 150.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 3), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 2), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 3), 
	 'На согласовании', '2023-04-10 12:15:00', NULL, NULL, NULL, 'Проблема с зарядкой', 50.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 4), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 3), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 2), 
	 'Ремонт закончен', '2023-04-15 09:30:00', '2023-04-17 10:00:00', '2023-04-19 13:45:00', '2023-04-20 14:00:00', 'Замена аккумулятора', 80.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 5), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 4), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 4), 
	 'Заказ завершён', '2023-04-20 11:00:00', '2023-04-23 11:30:00', '2023-04-25 15:30:00', '2023-04-27 16:00:00', 'Проблема с сенсорным экраном', 120.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber =6), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 4), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 5), 
	 'Заказ принят', '2023-04-25 13:45:00', NULL, NULL, NULL, 'Требуется замена камеры', 70.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 7), 	 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 3), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 7),
	'Начат ремонт', '2023-04-30 08:30:00', '2023-05-02 09:00:00', NULL, NULL, 'Не работает кнопка питания', 90.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 8), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 3), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 14), 
	 'На согласовании', '2023-05-05 10:15:00', NULL, NULL, NULL, 'Требуется замена микрофона', 60.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 9), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 13), 
	 'Ремонт закончен', '2023-05-10 12:00:00', '2023-05-12 12:30:00', '2023-05-14 16:00:00', '2023-05-15 16:30:00', 'Проблема с динамиком', 40.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 10), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 16), 
	 'Заказ завершён', '2023-05-15 14:30:00', '2023-05-18 15:00:00', '2023-05-20 17:30:00', '2023-05-21 18:00:00', 'Замена задней крышки', 30.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 11), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 2), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 10), 
	 'Заказ принят', '2023-05-20 09:45:00', NULL, NULL, NULL, 'Проблема с Wi-Fi', 110.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 12), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 3), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 9), 
	 'Начат ремонт', '2023-05-25 11:15:00', '2023-05-27 11:30:00', NULL, NULL, 'Требуется замена разъема для наушников', 100.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 13), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 3), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 8), 
	 'На согласовании', '2023-05-30 13:00:00', NULL, NULL, NULL, 'Не работает камера', 70.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 14), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 15), 
	 'Ремонт закончен', '2023-04-04 08:30:00', '2023-04-04 09:00:00', '2023-04-08 12:30:00', '2023-04-09 13:00:00', 'Замена кнопки громкости', 50.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 15), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 7), 
	 'Заказ завершён', '2023-04-09 10:00:00', '2023-04-11 10:30:00', '2023-04-13 14:00:00', '2023-04-14 14:30:00', 'Замена экрана', 200.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 16), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 2), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 11), 
	 'Заказ принят', '2023-04-14 12:15:00', NULL, NULL, NULL, 'Проблема с батареей', 70.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 17), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 14), 
	 'Начат ремонт', '2023-04-19 08:30:00', '2023-04-21 09:00:00', NULL, NULL, 'Требуется замена антенны', 80.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 18), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 3), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 10), 
	 'На согласовании', '2023-04-24 10:15:00', NULL, NULL, NULL, 'Проблема с микрофоном', 60.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 19), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 2), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 14), 
	 'Ремонт закончен', '2023-04-29 12:00:00', '2023-07-01 12:30:00', '2023-07-03 16:00:00', '2023-07-04 16:30:00', 'Замена дисплея', 150.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 20), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 8), 
	 'Заказ завершён', '2023-07-04 14:30:00', '2023-07-04 15:00:00', '2023-07-08 17:30:00', '2023-07-09 18:00:00', 'Проблема с разъемом питания', 90.00);


INSERT INTO [dbo].[Rooms] ([Name])
VALUES ('Комната Обсуждений'),
       ('Чат для Вопросов'),
       ('Групповой Чат'),
       ('Приватный Чат'),
       ('Комната Деловых Переговоров'),
       ('Чат для Творчества'),
       ('Комната Отдыха'),
       ('Общий Чат'),
       ('Чат для Игр'),
       ('Группа Поддержки'),
       ('Комната Совещаний'),
       ('Чат для Новостей'),
       ('Комната Обучения'),
       ('Чат для Знакомств'),
       ('Чат для Развлечений'),
       ('Комната Планирования'),
       ('Общий Чат для Коллег'),
       ('Группа Друзей'),
       ('Комната Тайного Общения'),
       ('Чат для Информации');

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

-- Заполнение таблицы Services
INSERT INTO [dbo].[Services] ([Title], [Description], [Price])
VALUES ('Диагностика устройства', 'Диагностика устройства для выявления неисправностей и определения причины поломки. Включает проверку аппаратной и программной составляющих.', 25.00),
       ('Замена дисплея', 'Замена поврежденного дисплея на вашем устройстве. Включает демонтаж старого дисплея и установку нового.', 80.00),
       ('Ремонт системной платы', 'Ремонт системной платы устройства. Включает замену неисправных компонентов и восстановление работоспособности.', 120.00),
       ('Замена аккумулятора', 'Замена изношенного или поврежденного аккумулятора на вашем устройстве. Включает демонтаж старого аккумулятора и установку нового.', 40.00),
       ('Установка программного обеспечения', 'Установка и настройка программного обеспечения на вашем устройстве. Включает установку операционной системы и необходимых приложений.', 30.00),
       ('Чистка от пыли и грязи', 'Чистка устройства от пыли и грязи для поддержания его работоспособности и производительности.', 15.00),
       ('Восстановление данных', 'Восстановление удаленных или поврежденных данных на вашем устройстве. Включает использование специализированных программ и техник восстановления.', 60.00),
       ('Настройка сетевых подключений', 'Настройка и установка сетевых подключений на вашем устройстве. Включает подключение к Wi-Fi, настройку сетевых параметров и проверку связи.', 25.00),
       ('Замена разъемов', 'Замена поврежденных или неисправных разъемов (USB, HDMI, аудио и т. д.) на вашем устройстве. Включает демонтаж старого разъема и установку нового.', 35.00),
       ('Ремонт клавиатуры', 'Ремонт поврежденной или неисправной клавиатуры на вашем устройстве. Включает замену клавиш и ремонт электрических контактов.', 50.00);

-- Заполнение таблицы ServicesPerformeds


select *from orders 
delete from orders

INSERT INTO [dbo].[Orders] ([IdDevice], [IdMaster], [IdClient], [Status], [Date_acceptance], [Repair_start_date], [Repair_completion_date], [Date_issue], [Description], [PriceOrder])
SELECT 
    (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = FLOOR(RAND() * 20) + 1),
    (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users WHERE IdRole = 3) AS foo WHERE rownumber = FLOOR(RAND() * 4) + 1),
    (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users WHERE IdRole = 1) AS foo WHERE rownumber = FLOOR(RAND() * 106) + 1),
    'Заказ завершён',
    DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, '2022-06-01', '2023-05-24'), 0), '2022-06-01'),
    DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, '2022-06-01', '2023-05-24'), 0), '2022-06-01'),
    DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, '2022-06-01', '2023-05-24'), 0), '2022-06-01'),
    DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, '2022-06-01', '2023-05-24'), 0), '2022-06-01'),
    (SELECT TOP 1 Description FROM (
        SELECT 'Проблема с разъемом питания' AS Description UNION ALL
        SELECT 'Неисправность в сетевом адаптере' AS Description UNION ALL
        SELECT 'Проблемы с зарядкой аккумулятора' AS Description UNION ALL
        SELECT 'Не работает клавиатура' AS Description UNION ALL
        SELECT 'Проблема с дисплеем' AS Description UNION ALL
        SELECT 'Замена жесткого диска' AS Description UNION ALL
        SELECT 'Не загружается операционная система' AS Description UNION ALL
        SELECT 'Проблема с звуком' AS Description UNION ALL
        SELECT 'Вирусная атака' AS Description UNION ALL
        SELECT 'Проблемы с Wi-Fi соединением' AS Description
    ) AS d ORDER BY NEWID()),
    ROUND(RAND() * 100 + 1, 2)
FROM
    (SELECT RAND() AS random) AS r
CROSS JOIN
    (SELECT RAND() AS random) AS r2;



DECLARE @i INT = 1
WHILE @i <= 200
BEGIN
   DECLARE @previousDate DATE = '2022-06-01';

INSERT INTO [dbo].[Orders] ([IdDevice], [IdMaster], [IdClient], [Status], [Date_acceptance], [Repair_start_date], [Repair_completion_date], [Date_issue], [Description], [PriceOrder])
SELECT 
    (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = FLOOR(RAND() * 20) + 1),
    (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users WHERE IdRole = 3) AS foo WHERE rownumber = FLOOR(RAND() * 4) + 1),
    (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users WHERE IdRole = 1) AS foo WHERE rownumber = FLOOR(RAND() * 106) + 1),
    (SELECT TOP 1 Description FROM (
        SELECT 'Заказ завершён' AS Description UNION ALL
        SELECT 'Заказ принят' AS Description UNION ALL
        SELECT 'Начат ремонт' AS Description UNION ALL
        SELECT 'На согласовании' AS Description UNION ALL
        SELECT 'Ремонт закончен' AS Description 
    ) AS d ORDER BY NEWID()),
    DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, @previousDate, '2023-05-24'), 0), @previousDate),
    DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, @previousDate, '2023-05-24'), 0), DATEADD(DAY, 1, @previousDate)),
    DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, @previousDate, '2023-05-24'), 0), DATEADD(DAY, 2, @previousDate)),
    DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, @previousDate, '2023-05-24'), 0), DATEADD(DAY, 3, @previousDate)),
    (SELECT TOP 1 Description FROM (
        SELECT 'Проблема с разъемом питания' AS Description UNION ALL
        SELECT 'Неисправность в сетевом адаптере' AS Description UNION ALL
        SELECT 'Проблемы с зарядкой аккумулятора' AS Description UNION ALL
        SELECT 'Не работает клавиатура' AS Description UNION ALL
        SELECT 'Проблема с дисплеем' AS Description UNION ALL
        SELECT 'Замена жесткого диска' AS Description UNION ALL
        SELECT 'Не загружается операционная система' AS Description UNION ALL
        SELECT 'Проблема с звуком' AS Description UNION ALL
        SELECT 'Вирусная атака' AS Description UNION ALL
        SELECT 'Проблемы с Wi-Fi соединением' AS Description
    ) AS d ORDER BY NEWID()),
    ROUND(RAND() * 100 + 1, 2)
FROM
    (SELECT RAND() AS random) AS r
CROSS JOIN
    (SELECT RAND() AS random) AS r2;
   
    
    SET @i = @i + 1;
END;