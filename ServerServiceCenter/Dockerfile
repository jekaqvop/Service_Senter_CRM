#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /server
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["ServerServiceCenter/ServerServiceCenter.csproj", "ServerServiceCenter/"]

RUN dotnet restore "ServerServiceCenter/ServerServiceCenter.csproj"
COPY . .
WORKDIR "/src/ServerServiceCenter"
RUN dotnet build "ServerServiceCenter.csproj" -c Release -o /server/build

FROM build AS publish
RUN dotnet publish "ServerServiceCenter.csproj" -c Release -o /server/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /server
COPY --from=publish /server/publish .
ENTRYPOINT ["dotnet", "ServerServiceCenter.dll"]