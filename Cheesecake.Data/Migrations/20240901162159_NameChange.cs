using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cheesecake.Data.Migrations
{
    /// <inheritdoc />
    public partial class NameChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ToppingsJson",
                table: "Cheesecakes",
                newName: "Toppings");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Toppings",
                table: "Cheesecakes",
                newName: "ToppingsJson");
        }
    }
}
