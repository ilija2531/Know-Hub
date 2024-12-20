using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace KnowHubApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class SeedRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dc286a55-6722-4d0a-80ac-4b0344b66664");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "df262951-3d3c-4121-88b5-ee563d7823bd");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "49d50304-bb4e-4df0-a535-ff823250feac", "232310ac-e10c-4321-91dd-5e50c430f3cb", "User", "USER" },
                    { "b680525d-97a6-439c-a0db-3072c6d6557b", "7e5af22f-d676-43b2-93bd-c5c2d88a993e", "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "49d50304-bb4e-4df0-a535-ff823250feac");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b680525d-97a6-439c-a0db-3072c6d6557b");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "dc286a55-6722-4d0a-80ac-4b0344b66664", "c9565110-d979-46fb-9dd7-1d226d918bfb", "Admin", "ADMIN" },
                    { "df262951-3d3c-4121-88b5-ee563d7823bd", "e0217442-cc48-4a9b-b654-f52166819936", "User", "USER" }
                });
        }
    }
}
