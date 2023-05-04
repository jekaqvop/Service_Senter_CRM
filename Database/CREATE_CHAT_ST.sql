use ServiceSenterDb;
CREATE TABLE ROOMS(
	Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	NAME NVARCHAR(40) NOT NULL
);

CREATE TABLE ROOM_USERS(
	Id INT IDENTITY(1,1) NOT NULL,
	RoomId INT NOT NULL,
	UserId INT NOT NULL,
	FOREIGN KEY (UserId) REFERENCES USERS (Id),
	FOREIGN KEY (RoomId) REFERENCES ROOMS (Id)
);

CREATE TABLE MESSAGES(
	Id INT IDENTITY(1,1) NOT NULL,
	RoomId INT NOT NULL,
	UserId INT NOT NULL, 
	MessageText nVARCHAR(1000),
	MessageImage nVARCHAR(1000),
	TimeSend DateTime,
	constraint only_one_value 
        check (MessageText is null or MessageImage is null) 
);

drop table MESSAGES

