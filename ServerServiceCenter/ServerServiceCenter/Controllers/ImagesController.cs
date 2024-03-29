﻿using DAL.Pattern.Repositories;
using DAL.Pattern;
using Microsoft.AspNetCore.Mvc;
using Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerServiceCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        UnitOfWork unitOfWork; 
        StorageImagePathsRepository storageImagePathsRepository;

        public ImagesController(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            
            storageImagePathsRepository = unitOfWork.GetStorageImagePathsRepository();
        }

        // GET: api/<ImagesController>
        [HttpGet("{idService}")]
        public IEnumerable<StorageImagePath> Get(int idService)
        {
            return storageImagePathsRepository.GetItemsForIdService(idService);
        }

        // GET api/<ImagesController>/5
        [HttpGet("{idService}/{id}")]
        public StorageImagePath Get(int idService, int id)
        {
            IEnumerable<StorageImagePath> storageImages = storageImagePathsRepository.GetItemsForIdService(idService);
            if (storageImages.Count() == 0)
            {
                return null;
            }
            return storageImages.FirstOrDefault();
        }
    }
}
