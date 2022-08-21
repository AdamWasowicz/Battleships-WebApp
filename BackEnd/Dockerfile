FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app


ARG ASPNETCORE_EXPOSE_PORT ASPNETCORE_EXPOSE_PORT
EXPOSE $ASPNETCORE_EXPOSE_PORT


FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["BackEnd.csproj", "."]
RUN dotnet restore "./BackEnd.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "BackEnd.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BackEnd.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BackEnd.dll"]