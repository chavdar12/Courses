# Build from the module folder: docker build -f Deployable/Dockerfile -t deployable .
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY Directory.Build.props .
COPY Deployable/Deployable.csproj Deployable/
RUN dotnet restore Deployable/Deployable.csproj
COPY Deployable/ Deployable/
RUN dotnet publish Deployable/Deployable.csproj -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app .
ARG BUILD_VERSION=docker
ENV Build__Version=$BUILD_VERSION
USER $APP_UID
EXPOSE 8080
# No HEALTHCHECK: the aspnet image has no curl; App Service / Kubernetes probe /health instead.
ENTRYPOINT ["dotnet", "Deployable.dll"]
