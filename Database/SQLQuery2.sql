use ServiceSenterDb;

INSERT INTO [dbo].[Devices] ([TypeDevice], [Model], [SerialNumber], [Manufacturer]) 
VALUES 
    ('�������', 'Samsung Galaxy S21', 'SN123456', 'Samsung'),
    ('�������', 'HP Pavilion', 'SN789012', 'HP'),
    ('�������', 'iPad Air', 'SN345678', 'Apple'),
    ('�������', 'iPhone 12', 'SN901234', 'Apple'),
    ('���������', 'Dell OptiPlex', 'SN567890', 'Dell'),
    ('���������', 'LG OLED55C1', 'SN123789', 'LG'),
    ('�������', 'Xiaomi Redmi Note 10', 'SN890123', 'Xiaomi'),
    ('�������', 'Samsung Galaxy Tab S7', 'SN234567', 'Samsung'),
    ('���������', 'Lenovo ThinkCentre', 'SN456789', 'Lenovo'),
    ('���������', 'Sony Bravia X90J', 'SN789012', 'Sony'),
    ('�������', 'Google Pixel 5', 'SN345678', 'Google'),
    ('�������', 'Acer Aspire 5', 'SN901234', 'Acer'),
    ('�������', 'Huawei MatePad Pro', 'SN567890', 'Huawei'),
    ('���������', 'TCL 55C715', 'SN123789', 'TCL'),
    ('�������', 'OnePlus 9 Pro', 'SN890123', 'OnePlus'),
    ('���������', 'ASUS ROG Strix G15', 'SN234567', 'ASUS'),
    ('�������', 'MSI Stealth 15M', 'SN456789', 'MSI'),
    ('�������', 'Amazon Fire HD 10', 'SN789012', 'Amazon'),
    ('���������', 'Hisense U8G', 'SN345678', 'Hisense'),
    ('�������', 'Motorola Moto G Power', 'SN901234', 'Motorola');

delete from Devices;

INSERT INTO [dbo].[Messages] ([UserId], [RoomId], [MessageText], [MessageImage], [TimeSend]) 
VALUES 
    (1, 1, '������!', NULL, '2023-05-15 10:00:00'),
    (1, 2, '��� ����?', NULL, '2023-05-15 11:30:00'),
    (2, 1, '������! ��� ���� ������?', NULL, '2023-05-25 12:15:00'),
    (2, 3, '������������! � ��� ������� �� ������?', NULL, '2023-05-15 14:00:00'),
    (3, 2, '������ ����! � ���� �������� � �����������.', NULL, '2023-05-26 09:30:00'),
    (3, 3, '��� ����� ����� ����������� ������?', NULL, '2023-05-16 11:00:00'),
    (4, 1, '������������! � ����� �� ���������� �� ������.', NULL, '2023-05-26 13:45:00'),
    (4, 2, '����� ������ �� ��������������?', NULL, '2023-05-17 08:30:00'),
    (5, 3, '������� �� ������� �����!', NULL, '2023-05-17 10:15:00'),
    (5, 1, '����� ����� ����� ������� ����������?', NULL, '2023-05-17 12:00:00'),
    (6, 2, '��� ����� ������ � ���������� ����������.', NULL, '2023-05-17 14:30:00'),
    (6, 3, '����� �������� ������ ��������?', NULL, '2023-05-18 09:45:00'),
    (7, 1, '� ���� �������� � ��������-�����������.', NULL, '2023-05-18 11:15:00'),
    (7, 2, '����� ��������� ����� ��� �������?', NULL, '2023-05-18 13:00:00'),
    (8, 3, '������� �� ����������!', NULL, '2023-05-19 08:30:00'),
    (8, 1, '����� ���� �������� �� ������?', NULL, '2023-05-19 10:00:00'),
    (9, 2, '� ���� �������� � �������� ����������.', NULL, '2023-05-19 12:45:00'),
    (9, 3, '����� �������������� ������ �� �����������?', NULL, '2023-05-19 14:15:00'),
    (10, 1, '� ���� �������� ����� �� ��������.', NULL, '2023-05-10 09:30:00'),
    (10, 2, '����� ������ ������ �����������?', NULL, '2023-05-10 11:00:00');

INSERT INTO [dbo].[Users] ([Login], [UserName], [Email], [PhoneNumber], [IdRole])
VALUES ('IvanIvanov1983', '������ ����', 'ivanov_ivan@example.com', '+375291234567', 1),
       ('Petrova1985', '������� ����', 'petrova_anna@example.com', '+375331234567', 1),
       ('AlexSidorov', '������� ���������', 'sidorov_alex@example.com', '+375441234567', 1),
       ('ElenaKuznetsova', '��������� �����', 'kuznetsova_elena@example.com', '+375251234567', 1),
       ('AdminUser', '������� ����', 'admin@example.com', '+375171234567', 2),
       ('MikhailMaster', '�������� ������', 'master@example.com', '+375551234567', 3),
       ('NikolayIvanov', '������ �������', 'nikolay_ivanov@example.com', '+375631234567', 1),
       ('MariaSergeeva', '�������� �����', 'sergeeva_maria@example.com', '+375731234567', 1),
       ('MaximAdmin', '����� ������', 'maxim_admin@example.com', '+375441234567', 2),
       ('SvetlanaPetrova', '������� ��������', 'svetlana_petrova@example.com', '+375291234567', 1),
       ('IgorSidorov', '������� �����', 'igor_sidorov@example.com', '+375331234567', 1),
       ('MasterUser', '�������� ����', 'master@example.com', '+375551234567', 3),
       ('ElenaKuzmina', '�������� �����', 'kuzmina_elena@example.com', '+375251234567', 1),
       ('IvanAdmin', '������� ����', 'admin@example.com', '+375171234567', 2),
       ('SergeyMaster', '�������� ������', 'master@example.com', '+375551234567', 3),
       ('OlgaIvanova', '������� �����', 'olga_ivanova@example.com', '+375631234567', 1),
       ('AnnaSergeeva', '�������� ����', 'sergeeva_anna@example.com', '+375731234567', 1),
       ('IvanAdmin1', '������� ����', 'admin1@example.com', '+375441234567', 2),
       ('MariaPetrova', '������� �����', 'maria_petrova@example.com', '+375291234567', 1),
       ('IgorSidorov1', '������� �����', 'igor_sidorov1@example.com', '+375331234567', 1),
       ('MasterUser1', '�������� ����', 'master1@example.com', '+375551234567', 3);

--�������
INSERT INTO [dbo].[Users] ([Login], [UserName], [Email], [PhoneNumber], [IdRole])
VALUES ('ViktorSmirnov1991', '������� ������', 'smirnov_viktor@example.com', '+375331234567', 1),
       ('NataliaKuznetsova1986', '��������� �������', 'kuznetsova_natalia@example.com', '+375251234567', 1),
       ('IgorPopov1993', '����� �����', 'popov_igor@example.com', '+375291234567', 1),
       ('TatianaIvanova1981', '������� �������', 'ivanova_tatiana@example.com', '+375441234567', 1),
       ('AndreySergeev1988', '������� ������', 'sergeev_andrey@example.com', '+375331234567', 1),
       ('EkaterinaKozlova1994', '������� ���������', 'kozlova_ekaterina@example.com', '+375251234567', 1),
       ('PavelVasiliev1983', '�������� �����', 'vasiliev_pavel@example.com', '+375291234567', 1),
       ('SvetlanaIvanova1990', '������� ��������', 'ivanova_svetlana@example.com', '+375441234567', 1),
       ('ArtemSidorov1985', '������� �����', 'sidorov_artem@example.com', '+375331234567', 1),
       ('MariaSmirnova1982', '�������� �����', 'smirnova_maria@example.com', '+375251234567', 1),
       ('DmitryPopov1997', '����� �������', 'popov_dmitry@example.com', '+375291234567', 1),
       ('ElenaKuznetsova1989', '��������� �����', 'kuznetsova_elena@example.com', '+375441234567', 1),
       ('SergeyIvanov1984', '������ ������', 'ivanov_sergey@example.com', '+375331234567', 1),
       ('AnnaSidorova1992', '�������� ����', 'sidorova_anna@example.com', '+375251234567', 1),
       ('MaximSmirnov1987', '������� ������', 'smirnov_maxim@example.com', '+375291234567', 1),
       ('OlgaPopova1995', '������ �����', 'popova_olga@example.com', '+375441234567', 1),
       ('IvanKuznetsov1983', '�������� ����', 'kuznetsov_ivan@example.com', '+375331234567', 1),
       ('MariaIvanova1991', '������� �����', 'ivanova_maria@example.com', '+375251234567', 1),
       ('AlexSidorov1986', '������� �������', 'sidorov_alex@example.com', '+375291234567', 1),
       ('ElenaSmirnova1984', '�������� �����', 'smirnova_elena@example.com', '+375441234567', 1),
       ('DmitryKuznetsov1993', '�������� �������', 'kuznetsov_dmitry@example.com', '+375331234567', 1),
       ('OlgaVasilieva1992', '��������� �����', 'vasilieva_olga@example.com', '+375251234567', 1),
       ('SergeyPopov1985', '����� ������', 'popov_sergey@example.com', '+375291234567', 1),
       ('AnnaKozlova1990', '������� ����', 'kozlova_anna@example.com', '+375441234567', 1),
       ('MaximIvanov1988', '������ ������', 'ivanov_maxim@example.com', '+375331234567', 1),
       ('ElenaSergeeva1987', '�������� �����', 'sergeeva_elena@example.com', '+375251234567', 1),
       ('ViktorSmirnov1989', '������� ������', 'smirnov_viktor@example.com', '+375291234567', 1),
       ('NataliaKuznetsova1984', '��������� �������', 'kuznetsova_natalia@example.com', '+375441234567', 1),
       ('IgorPopov1992', '����� �����', 'popov_igor@example.com', '+375331234567', 1),
       ('TatianaIvanova1987', '������� �������', 'ivanova_tatiana@example.com', '+375251234567', 1),
       ('AndreySergeev1995', '������� ������', 'sergeev_andrey@example.com', '+375291234567', 1),
       ('EkaterinaKozlova1983', '������� ���������', 'kozlova_ekaterina@example.com', '+375441234567', 1),
       ('PavelVasiliev1990', '�������� �����', 'vasiliev_pavel@example.com', '+375331234567', 1),
       ('SvetlanaIvanova1986', '������� ��������', 'ivanova_svetlana@example.com', '+375251234567', 1),
       ('ArtemSidorov1982', '������� �����', 'sidorov_artem@example.com', '+375291234567', 1),
       ('MariaSmirnova1991', '�������� �����', 'smirnova_maria@example.com', '+375441234567', 1),
       ('DmitryPopov1985', '����� �������', 'popov_dmitry@example.com', '+375331234567', 1),
       ('ElenaKuznetsova1993', '��������� �����', 'kuznetsova_elena@example.com', '+375251234567', 1),
       ('SergeyIvanov1981', '������ ������', 'ivanov_sergey@example.com', '+375291234567', 1),
       ('AnnaSidorova1989', '�������� ����', 'sidorova_anna@example.com', '+375441234567', 1),
       ('MaximSmirnov1987', '������� ������', 'smirnov_maxim@example.com', '+375331234567', 1),
       ('OlgaPopova1995', '������ �����', 'popova_olga@example.com', '+375251234567', 1),
       ('IvanKuznetsov1984', '�������� ����', 'kuznetsov_ivan@example.com', '+375291234567', 1),
       ('MariaIvanova1992', '������� �����', 'ivanova_maria@example.com', '+375441234567', 1),
       ('AlexSidorov1983', '������� �������', 'sidorov_alex@example.com', '+375331234567', 1),
       ('ElenaSmirnova1991', '�������� �����', 'smirnova_elena@example.com', '+375251234567', 1),
       ('DmitryKuznetsov1988', '�������� �������', 'kuznetsov_dmitry@example.com', '+375291234567', 1),
       ('OlgaVasilieva1990', '��������� �����', 'vasilieva_olga@example.com', '+375441234567', 1),
       ('SergeyPopov1987', '����� ������', 'popov_sergey@example.com', '+375331234567', 1),
       ('AnnaKozlova1985', '������� ����', 'kozlova_anna@example.com', '+375251234567', 1),
       ('MaximIvanov1993', '������ ������', 'ivanov_maxim@example.com', '+375291234567', 1),
       ('ElenaSergeeva1992', '�������� �����', 'sergeeva_elena@example.com', '+375441234567', 1),
       ('ViktorSmirnov1989', '������� ������', 'smirnov_viktor@example.com', '+375331234567', 1),
       ('NataliaKuznetsova1984', '��������� �������', 'kuznetsova_natalia@example.com', '+375251234567', 1),
       ('IgorPopov1992', '����� �����', 'popov_igor@example.com', '+375291234567', 1),
       ('TatianaIvanova1987', '������� �������', 'ivanova_tatiana@example.com', '+375441234567', 1);

INSERT INTO [dbo].[Users] ([Login], [UserName], [Email], [PhoneNumber], [IdRole]) values
	   ('AndreySergeev1995', '������� ������', 'sergeev_andrey@example.com', '+375331234567', 1),
       ('EkaterinaKozlova1983', '������� ���������', 'kozlova_ekaterina@example.com', '+375251234567', 1),
       ('PavelVasiliev1990', '�������� �����', 'vasiliev_pavel@example.com', '+375291234567', 1),
       ('SvetlanaIvanova1986', '������� ��������', 'ivanova_svetlana@example.com', '+375441234567', 1),
       ('ArtemSidorov1982', '������� �����', 'sidorov_artem@example.com', '+375331234567', 1),
       ('MariaSmirnova1991', '�������� �����', 'smirnova_maria@example.com', '+375251234567', 1),
       ('DmitryPopov1985', '����� �������', 'popov_dmitry@example.com', '+375291234567', 1),
       ('ElenaKuznetsova1993', '��������� �����', 'kuznetsova_elena@example.com', '+375441234567', 1),
       ('SergeyIvanov1981', '������ ������', 'ivanov_sergey@example.com', '+375331234567', 1),
       ('AnnaSidorova1989', '�������� ����', 'sidorova_anna@example.com', '+375251234567', 1),
       ('MaximSmirnov1987', '������� ������', 'smirnov_maxim@example.com', '+375291234567', 1),
       ('OlgaPopova1995', '������ �����', 'popova_olga@example.com', '+375441234567', 1),
       ('IvanKuznetsov1984', '�������� ����', 'kuznetsov_ivan@example.com', '+375331234567', 1),
       ('MariaIvanova1992', '������� �����', 'ivanova_maria@example.com', '+375441234567', 1),
       ('AlexSidorov1983', '������� �������', 'sidorov_alex@example.com', '+375331234567', 1),
       ('ElenaSmirnova1991', '�������� �����', 'smirnova_elena@example.com', '+375251234567', 1),
       ('DmitryKuznetsov1988', '�������� �������', 'kuznetsov_dmitry@example.com', '+375291234567', 1),
       ('OlgaVasilieva1990', '��������� �����', 'vasilieva_olga@example.com', '+375441234567', 1),
       ('SergeyPopov1987', '����� ������', 'popov_sergey@example.com', '+375331234567', 1),
       ('AnnaKozlova1985', '������� ����', 'kozlova_anna@example.com', '+375251234567', 1),
       ('MaximIvanov1993', '������ ������', 'ivanov_maxim@example.com', '+375291234567', 1),
       ('ElenaSergeeva1992', '�������� �����', 'sergeeva_elena@example.com', '+375441234567', 1),
       ('ViktorSmirnov1989', '������� ������', 'smirnov_viktor@example.com', '+375331234567', 1),
       ('NataliaKuznetsova1984', '��������� �������', 'kuznetsova_natalia@example.com', '+375251234567', 1),
       ('IgorPopov1992', '����� �����', 'popov_igor@example.com', '+375291234567', 1),
       ('TatianaIvanova1987', '������� �������', 'ivanova_tatiana@example.com', '+375441234567', 1),
       ('AndreySergeev1995', '������� ������', 'sergeev_andrey@example.com', '+375331234567', 1),
       ('EkaterinaKozlova1983', '������� ���������', 'kozlova_ekaterina@example.com', '+375251234567', 1),
       ('PavelVasiliev1990', '�������� �����', 'vasiliev_pavel@example.com', '+375291234567', 1),
       ('SvetlanaIvanova1986', '������� ��������', 'ivanova_svetlana@example.com', '+375441234567', 1),
       ('ArtemSidorov1982', '������� �����', 'sidorov_artem@example.com', '+375331234567', 1),
       ('MariaSmirnova1991', '�������� �����', 'smirnova_maria@example.com', '+375251234567', 1),
       ('DmitryPopov1985', '����� �������', 'popov_dmitry@example.com', '+375291234567', 1),
       ('ElenaKuznetsova1993', '��������� �����', 'kuznetsova_elena@example.com', '+375441234567', 1);



INSERT INTO [dbo].[Orders] ([IdDevice], [IdMaster], [IdClient], [Status], [Date_acceptance], [Repair_start_date], [Repair_completion_date], [Date_issue], [Description], [PriceOrder]) 
VALUES 
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 1), 
	'����� ������', '2023-04-01 10:00:00', NULL, NULL, NULL, '�� ����������', 100.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 2), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 2), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 2), 
	 '����� ������', '2023-04-05 11:30:00', '2023-04-07 12:00:00', NULL, NULL, '��������� ������ �������� �����', 150.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 3), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 2), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 3), 
	 '�� ������������', '2023-04-10 12:15:00', NULL, NULL, NULL, '�������� � ��������', 50.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 4), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 3), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 2), 
	 '������ ��������', '2023-04-15 09:30:00', '2023-04-17 10:00:00', '2023-04-19 13:45:00', '2023-04-20 14:00:00', '������ ������������', 80.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 5), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 4), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 4), 
	 '����� ��������', '2023-04-20 11:00:00', '2023-04-23 11:30:00', '2023-04-25 15:30:00', '2023-04-27 16:00:00', '�������� � ��������� �������', 120.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber =6), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 4), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 5), 
	 '����� ������', '2023-04-25 13:45:00', NULL, NULL, NULL, '��������� ������ ������', 70.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 7), 	 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 3), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 7),
	'����� ������', '2023-04-30 08:30:00', '2023-05-02 09:00:00', NULL, NULL, '�� �������� ������ �������', 90.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 8), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 3), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 14), 
	 '�� ������������', '2023-05-05 10:15:00', NULL, NULL, NULL, '��������� ������ ���������', 60.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 9), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 13), 
	 '������ ��������', '2023-05-10 12:00:00', '2023-05-12 12:30:00', '2023-05-14 16:00:00', '2023-05-15 16:30:00', '�������� � ���������', 40.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 10), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 16), 
	 '����� ��������', '2023-05-15 14:30:00', '2023-05-18 15:00:00', '2023-05-20 17:30:00', '2023-05-21 18:00:00', '������ ������ ������', 30.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 11), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 2), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 10), 
	 '����� ������', '2023-05-20 09:45:00', NULL, NULL, NULL, '�������� � Wi-Fi', 110.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 12), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 3), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 9), 
	 '����� ������', '2023-05-25 11:15:00', '2023-05-27 11:30:00', NULL, NULL, '��������� ������ ������� ��� ���������', 100.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 13), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 3), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 8), 
	 '�� ������������', '2023-05-30 13:00:00', NULL, NULL, NULL, '�� �������� ������', 70.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 14), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 15), 
	 '������ ��������', '2023-04-04 08:30:00', '2023-04-04 09:00:00', '2023-04-08 12:30:00', '2023-04-09 13:00:00', '������ ������ ���������', 50.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 15), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 7), 
	 '����� ��������', '2023-04-09 10:00:00', '2023-04-11 10:30:00', '2023-04-13 14:00:00', '2023-04-14 14:30:00', '������ ������', 200.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 16), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 2), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 11), 
	 '����� ������', '2023-04-14 12:15:00', NULL, NULL, NULL, '�������� � ��������', 70.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 17), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 14), 
	 '����� ������', '2023-04-19 08:30:00', '2023-04-21 09:00:00', NULL, NULL, '��������� ������ �������', 80.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 18), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 3), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 10), 
	 '�� ������������', '2023-04-24 10:15:00', NULL, NULL, NULL, '�������� � ����������', 60.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 19), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 2), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 14), 
	 '������ ��������', '2023-04-29 12:00:00', '2023-07-01 12:30:00', '2023-07-03 16:00:00', '2023-07-04 16:30:00', '������ �������', 150.00),
    ((SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = 20), 
	 (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 3) AS foo WHERE rownumber = 1), 
	(SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users where IdRole = 1) AS foo WHERE rownumber = 8), 
	 '����� ��������', '2023-07-04 14:30:00', '2023-07-04 15:00:00', '2023-07-08 17:30:00', '2023-07-09 18:00:00', '�������� � �������� �������', 90.00);


INSERT INTO [dbo].[Rooms] ([Name])
VALUES ('������� ����������'),
       ('��� ��� ��������'),
       ('��������� ���'),
       ('��������� ���'),
       ('������� ������� �����������'),
       ('��� ��� ����������'),
       ('������� ������'),
       ('����� ���'),
       ('��� ��� ���'),
       ('������ ���������'),
       ('������� ���������'),
       ('��� ��� ��������'),
       ('������� ��������'),
       ('��� ��� ���������'),
       ('��� ��� �����������'),
       ('������� ������������'),
       ('����� ��� ��� ������'),
       ('������ ������'),
       ('������� ������� �������'),
       ('��� ��� ����������');

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

-- ���������� ������� Services
INSERT INTO [dbo].[Services] ([Title], [Description], [Price])
VALUES ('����������� ����������', '����������� ���������� ��� ��������� �������������� � ����������� ������� �������. �������� �������� ���������� � ����������� ������������.', 25.00),
       ('������ �������', '������ ������������� ������� �� ����� ����������. �������� �������� ������� ������� � ��������� ������.', 80.00),
       ('������ ��������� �����', '������ ��������� ����� ����������. �������� ������ ����������� ����������� � �������������� �����������������.', 120.00),
       ('������ ������������', '������ ����������� ��� ������������� ������������ �� ����� ����������. �������� �������� ������� ������������ � ��������� ������.', 40.00),
       ('��������� ������������ �����������', '��������� � ��������� ������������ ����������� �� ����� ����������. �������� ��������� ������������ ������� � ����������� ����������.', 30.00),
       ('������ �� ���� � �����', '������ ���������� �� ���� � ����� ��� ����������� ��� ����������������� � ������������������.', 15.00),
       ('�������������� ������', '�������������� ��������� ��� ������������ ������ �� ����� ����������. �������� ������������� ������������������ �������� � ������ ��������������.', 60.00),
       ('��������� ������� �����������', '��������� � ��������� ������� ����������� �� ����� ����������. �������� ����������� � Wi-Fi, ��������� ������� ���������� � �������� �����.', 25.00),
       ('������ ��������', '������ ������������ ��� ����������� �������� (USB, HDMI, ����� � �. �.) �� ����� ����������. �������� �������� ������� ������� � ��������� ������.', 35.00),
       ('������ ����������', '������ ������������ ��� ����������� ���������� �� ����� ����������. �������� ������ ������ � ������ ������������� ���������.', 50.00);

-- ���������� ������� ServicesPerformeds


select *from orders 
delete from orders

INSERT INTO [dbo].[Orders] ([IdDevice], [IdMaster], [IdClient], [Status], [Date_acceptance], [Repair_start_date], [Repair_completion_date], [Date_issue], [Description], [PriceOrder])
SELECT 
    (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM Devices) AS foo WHERE rownumber = FLOOR(RAND() * 20) + 1),
    (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users WHERE IdRole = 3) AS foo WHERE rownumber = FLOOR(RAND() * 4) + 1),
    (SELECT id FROM (SELECT ROW_NUMBER() OVER (ORDER BY id ASC) AS rownumber, id FROM users WHERE IdRole = 1) AS foo WHERE rownumber = FLOOR(RAND() * 106) + 1),
    '����� ��������',
    DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, '2022-06-01', '2023-05-24'), 0), '2022-06-01'),
    DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, '2022-06-01', '2023-05-24'), 0), '2022-06-01'),
    DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, '2022-06-01', '2023-05-24'), 0), '2022-06-01'),
    DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, '2022-06-01', '2023-05-24'), 0), '2022-06-01'),
    (SELECT TOP 1 Description FROM (
        SELECT '�������� � �������� �������' AS Description UNION ALL
        SELECT '������������� � ������� ��������' AS Description UNION ALL
        SELECT '�������� � �������� ������������' AS Description UNION ALL
        SELECT '�� �������� ����������' AS Description UNION ALL
        SELECT '�������� � ��������' AS Description UNION ALL
        SELECT '������ �������� �����' AS Description UNION ALL
        SELECT '�� ����������� ������������ �������' AS Description UNION ALL
        SELECT '�������� � ������' AS Description UNION ALL
        SELECT '�������� �����' AS Description UNION ALL
        SELECT '�������� � Wi-Fi �����������' AS Description
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
        SELECT '����� ��������' AS Description UNION ALL
        SELECT '����� ������' AS Description UNION ALL
        SELECT '����� ������' AS Description UNION ALL
        SELECT '�� ������������' AS Description UNION ALL
        SELECT '������ ��������' AS Description 
    ) AS d ORDER BY NEWID()),
    DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, @previousDate, '2023-05-24'), 0), @previousDate),
    DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, @previousDate, '2023-05-24'), 0), DATEADD(DAY, 1, @previousDate)),
    DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, @previousDate, '2023-05-24'), 0), DATEADD(DAY, 2, @previousDate)),
    DATEADD(DAY, ROUND(RAND() * DATEDIFF(DAY, @previousDate, '2023-05-24'), 0), DATEADD(DAY, 3, @previousDate)),
    (SELECT TOP 1 Description FROM (
        SELECT '�������� � �������� �������' AS Description UNION ALL
        SELECT '������������� � ������� ��������' AS Description UNION ALL
        SELECT '�������� � �������� ������������' AS Description UNION ALL
        SELECT '�� �������� ����������' AS Description UNION ALL
        SELECT '�������� � ��������' AS Description UNION ALL
        SELECT '������ �������� �����' AS Description UNION ALL
        SELECT '�� ����������� ������������ �������' AS Description UNION ALL
        SELECT '�������� � ������' AS Description UNION ALL
        SELECT '�������� �����' AS Description UNION ALL
        SELECT '�������� � Wi-Fi �����������' AS Description
    ) AS d ORDER BY NEWID()),
    ROUND(RAND() * 100 + 1, 2)
FROM
    (SELECT RAND() AS random) AS r
CROSS JOIN
    (SELECT RAND() AS random) AS r2;
   
    
    SET @i = @i + 1;
END;