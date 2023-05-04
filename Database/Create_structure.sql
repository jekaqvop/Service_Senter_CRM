
CREATE TABLE Devices(
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TypeDevice] [nvarchar](max) NOT NULL,
	[Model] [nvarchar](max) NOT NULL,
	[SerialNumber] [nvarchar](max) NOT NULL,
	[Manufacturer] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Devices] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]



CREATE TABLE [dbo].[Orders](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdDevice] [int] NOT NULL,
	[IdMaster] [int] NOT NULL,
	[IdClient] [int] NOT NULL,
	[Status] [nvarchar](max) NOT NULL,
	[Date_acceptance] [datetime2](7) NULL,
	[Repair_start_date] [datetime2](7) NULL,
	[Repair_completion_date] [datetime2](7) NULL,
	[Date_issue] [datetime2](7) NULL,
	[Description] [nvarchar](max) NOT NULL,
	[PriceOrder] [decimal](18, 2) NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]


ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Devices_IdDevice] FOREIGN KEY([IdDevice])
REFERENCES [dbo].[Devices] ([Id])


ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Devices_IdDevice]


ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Users_IdClient] FOREIGN KEY([IdClient])
REFERENCES [dbo].[Users] ([Id])


ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Users_IdClient]


ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Users_IdMaster] FOREIGN KEY([IdMaster])
REFERENCES [dbo].[Users] ([Id])


ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Users_IdMaster]


USE [ServiceSenterDb]


CREATE TABLE [dbo].[Roles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

CREATE TABLE [dbo].[Services](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_Services] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

CREATE TABLE [dbo].[ServicesPerformeds](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdOrder] [int] NOT NULL,
	[IdService] [int] NOT NULL,
 CONSTRAINT [PK_ServicesPerformeds] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[ServicesPerformeds]  WITH CHECK ADD  CONSTRAINT [FK_ServicesPerformeds_Orders_IdOrder] FOREIGN KEY([IdOrder])
REFERENCES [dbo].[Orders] ([Id])


ALTER TABLE [dbo].[ServicesPerformeds] CHECK CONSTRAINT [FK_ServicesPerformeds_Orders_IdOrder]


ALTER TABLE [dbo].[ServicesPerformeds]  WITH CHECK ADD  CONSTRAINT [FK_ServicesPerformeds_Services_IdService] FOREIGN KEY([IdService])
REFERENCES [dbo].[Services] ([Id])


ALTER TABLE [dbo].[ServicesPerformeds] CHECK CONSTRAINT [FK_ServicesPerformeds_Services_IdService]


CREATE TABLE [dbo].[StorageImagesPaths](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdService] [int] NOT NULL,
	[PathImage] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_StorageImagesPaths] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]


ALTER TABLE [dbo].[StorageImagesPaths]  WITH CHECK ADD  CONSTRAINT [FK_StorageImagesPaths_Services_IdService] FOREIGN KEY([IdService])
REFERENCES [dbo].[Services] ([Id])


ALTER TABLE [dbo].[StorageImagesPaths] CHECK CONSTRAINT [FK_StorageImagesPaths_Services_IdService]


CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Login] [nvarchar](max) NOT NULL,
	[UserName] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[PhoneNumber] [nvarchar](max) NOT NULL,
	[Pwd] [nvarchar](max) NOT NULL,
	[IdRole] [int] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]


ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Roles_IdRole] FOREIGN KEY([IdRole])
REFERENCES [dbo].[Roles] ([Id])


ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Roles_IdRole]


