using Microsoft.AspNetCore.Mvc;
using ToDoListApi.Controllers;
using ToDoListApi.Models;
using ToDoListApi.UnitTests.Services;


namespace ToDoList.Api.UnitTests
{
    public class ToDoItemControllerTest
    {
        [Fact]
        public async Task PutAsync_CreateToDoItem_MustReturnCreatedResult()
        {
            //Arrange
            var toDoItemService = new InMemoryToDoItemService();
            var sut = new ToDoItemsController(new TestLogger<ToDoItemsController>(), toDoItemService);
            var id = Guid.NewGuid().ToString();
            var todoItem = new ToDoItemDto
            {
                Id = id,
                Description = "Test",
                Done = false,
                Favorite = false
            };

            //Act
            var createActionResult = await sut.Put(id, todoItem);

            //Assert
            Assert.IsType<CreatedResult>(createActionResult.Result);
            var createdResult = createActionResult.Result as CreatedResult;
            Assert.Equivalent(todoItem, createdResult?.Value);


        }

        [Fact]
        public async Task DeleteAsync_DeleteToDoItem_MustReturnNoContent()
        {
            //Arrange
            var toDoItemService = new InMemoryToDoItemService();
            var sut = new ToDoItemsController(new TestLogger<ToDoItemsController>(), toDoItemService);
            var id = Guid.NewGuid().ToString();
            var todoItem = new ToDoItemDto
            {
                Id = id,
                Description = "Test",
                Done = false,
                Favorite = false
            };

            //Act
            toDoItemService.AddToDoItem(todoItem);
            var deleteActionResult = await sut.Delete(id);

            //Assert
            Assert.IsType<NoContentResult>(deleteActionResult);

        }

        [Fact]
        public async Task DeleteAsync_DeleteToDoItem_MustReturnNotFound()
        {
            //Arrange
            var toDoItemService = new InMemoryToDoItemService();
            var sut = new ToDoItemsController(new TestLogger<ToDoItemsController>(), toDoItemService);
            var id = Guid.NewGuid().ToString();


            //Act
            var deleteActionResult = await sut.Delete(id);

            //Assert
            Assert.IsType<NotFoundObjectResult>(deleteActionResult);

        }

        [Fact]
        public async Task GetByIdAsync_GetItemById_MustReturnOK()
        {
            //Arrange
            var toDoItemService = new InMemoryToDoItemService();
            var sut = new ToDoItemsController(new TestLogger<ToDoItemsController>(), toDoItemService);
            var id = Guid.NewGuid().ToString();
            var todoItem = new ToDoItemDto
            {
                Id = id,
                Description = "Test",
                Done = false,
                Favorite = false
            };

            //Act
            toDoItemService.AddToDoItem(todoItem);
            var getActionResult  = await sut.Get(id);

            //Assert
            Assert.IsType<OkObjectResult>(getActionResult.Result);
            var getResult = getActionResult.Result as OkObjectResult;
            Assert.Equivalent(todoItem, getResult?.Value);

        }



    }


}