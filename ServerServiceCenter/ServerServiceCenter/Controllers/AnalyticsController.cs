using DBManager.Pattern.Repositories;
using DBManager.Pattern;
using Microsoft.AspNetCore.Mvc;
using Aardvark.Base;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerServiceCenter.Controllers
{
    

    [Route("api/private/[controller]")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {
        UnitOfWork unitOfWork;
        DeviceRepository deviceRepository;
        public AnalyticsController(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.deviceRepository = unitOfWork.GetDeviceRepository();
        }

        // GET api/private/<AnalyticsController>/average_price_day
        [HttpGet("average_price_day")]
        public decimal GetAveragePriceDay()
        {
            decimal? value = unitOfWork.GetOrderRepository().GetList().Where(o => o.Date_issue != null && 
            o.Date_issue.Value.Date == DateTime.Now.Date && o.Date_issue.Value.Year == DateTime.Now.Year
            && o.Date_issue.Value.Day == DateTime.Now.Day)
                .Average(o => o.PriceOrder);
            decimal retVal = value != null ? decimal.Round((decimal)value, 2) : 0;
            return retVal == null ? 0 : retVal;
        }

        // GET api/private/<AnalyticsController>/average_price_day
        [HttpGet("average_price_month")]
        public decimal GetAveragePrice()
        {
            decimal? value = unitOfWork.GetOrderRepository().GetList().Where(o => o.Date_issue != null &&
            o.Date_issue.Value.Month == DateTime.Now.Month 
            && o.Date_issue.Value.Year == DateTime.Now.Year).Average(o => o.PriceOrder);
            decimal retVal = value != null ? decimal.Round((decimal)value, 2) : 0;
            return retVal == null ? 0 : retVal;
        }

        // GET api/private/<AnalyticsController>/average_price_day
        [HttpGet("count_orders_last_month")]
        public int GetCountOrdersLastMonth()
        {
            int value = unitOfWork.GetOrderRepository().GetList().Where(o => o.Date_issue != null && 
            o.Date_issue.Value.Month == DateTime.Now.Month
            && o.Date_issue.Value.Year == DateTime.Now.Year).Count();            
            return value;
        }

        // GET api/private/<AnalyticsController>/average_price_day
        [HttpGet("count_orders_last_year")]
        public int GetCountOrdersLastYear()
        {
            int value = unitOfWork.GetOrderRepository().GetList().Where(o => o.Date_issue != null && 
            o.Date_issue.Value.Year == DateTime.Now.Year)
                .Count();
            return value;
        }

        [HttpGet("income_month")]
        public decimal GetIncomeMonth(int id)
        {
            decimal? value = unitOfWork.GetOrderRepository().GetList().Where(o => o.Date_issue != null && 
            o.Date_issue.Value.Month == DateTime.Now.Month
             && o.Date_issue.Value.Year == DateTime.Now.Year).Sum(o => o.PriceOrder);
            decimal retVal = value != null ? decimal.Round((decimal)value, 2) : 0;
            return retVal == null ? 0 : retVal;
        }
        
        [HttpGet("diff_income_prev_perc")]
        public decimal GetDiffIncomeMonth()
        {
            decimal? value = unitOfWork.GetOrderRepository().GetList().Where(o => o.Date_issue != null && 
            o.Date_issue.Value.Month == DateTime.Now.Month
             && o.Date_issue.Value.Year == DateTime.Now.Year).Sum(o => o.PriceOrder);
            decimal? prevValue = unitOfWork.GetOrderRepository().GetList().Where(o => o.Date_issue != null && 
            o.Date_issue.Value.Month == DateTime.Now.AddMonths(-1).Month
             && o.Date_issue.Value.Year == DateTime.Now.Year).Sum(o => o.PriceOrder);
            decimal retVal = value <=0 || prevValue <=0 ? 0 : (decimal)(value / (prevValue / 100) - 100);
            return retVal;
        }

        [HttpGet("income_year")]
        public decimal GetIncomeYear()
        {
            decimal? value = unitOfWork.GetOrderRepository().GetList().Where(o => o.Date_issue != null && 
            o.Date_issue.Value.Year == DateTime.Now.Year)
                .Sum(o => o.PriceOrder);
            decimal retVal = value != null ? decimal.Round((decimal)value, 2) : 0;
            return retVal == null ? 0 : retVal;
        }

        class Data_daily_traffic
        {
            public List<int> Days { get; set; } = new List<int>();
            public List<int> Counts { get; set; } = new List<int>();
        }

        [HttpGet("data_daily_traffic")]
        public async Task<IActionResult> Getdata_daily_traffic()
        {
            Data_daily_traffic data = new Data_daily_traffic();
            DateTime now = DateTime.Now.Date;
            for (int i = 0; i < 7; i++)
            {
                int value = unitOfWork.GetOrderRepository().GetList().Where(o => o.Date_acceptance != null && o.Date_acceptance.Value.Day == DateTime.Now.AddDays(-i).Day)
                .Count();
                data.Days.Add(DateTime.Now.AddDays(-i).Day);
                data.Counts.Add(value);
            }            
            

            return new ObjectResult(data);
        }

        class Data_Week_Orders
        {
            public List<int> DataAccept { get; set; } = new List<int>();
            public List<int> DataStart { get; set; } = new List<int>();
            public List<int> DataComplite { get; set; } = new List<int>();
            public List<int> DataIssue { get; set; } = new List<int>();
            public List<int> Days { get; set; } = new List<int>();
        }

        [HttpGet("week_orders")]
        public async Task<IActionResult> GetData_Week_Orders()
        {
            Data_Week_Orders data = new Data_Week_Orders();
            DateTime now = DateTime.Now.Date;
            for (int i = 0; i < 7; i++)
            {
                int dataAccept = unitOfWork.GetOrderRepository().GetList().Where(o => o.Date_acceptance != null && o.Date_acceptance.Value.Day == DateTime.Now.AddDays(-i).Day
                && o.Status.Equals("Заказ принят"))
                .Count();
                int dataStart = unitOfWork.GetOrderRepository().GetList().Where(o => o.Repair_start_date != null && o.Repair_start_date.Value.Day == DateTime.Now.AddDays(-i).Day
                && o.Status.Equals("Начат ремонт"))
                .Count();
                int dataComplite = unitOfWork.GetOrderRepository().GetList().Where(o => o.Repair_completion_date != null && o.Repair_completion_date.Value.Day == DateTime.Now.AddDays(-i).Day
                && o.Status.Equals("Ремонт закончен"))
                .Count();
                int dataIssue = unitOfWork.GetOrderRepository().GetList().Where(o => o.Date_issue != null && o.Date_issue.Value.Day == DateTime.Now.AddDays(-i).Day
                && o.Status.Equals("Заказ завершён"))
                .Count();
                data.Days.Add(DateTime.Now.AddDays(-i).Day);
                data.DataAccept.Add(dataAccept);
                data.DataStart.Add(dataStart);
                data.DataComplite.Add(dataComplite);
                data.DataIssue.Add(dataIssue);
            }


            return new ObjectResult(data);
        }

        [HttpGet("mounth_orders")]
        public async Task<IActionResult> GetMounth_Orders()
        {           
                int dataAccept = unitOfWork.GetOrderRepository().GetList().Where(o => o.Date_acceptance != null &&
            o.Date_acceptance.Value.Month == DateTime.Now.Month
             && o.Date_acceptance.Value.Year == DateTime.Now.Year
             && o.Status.Equals("Заказ принят"))
                .Count();
                int dataStart = unitOfWork.GetOrderRepository().GetList().Where(o => o.Repair_start_date != null &&
            o.Repair_start_date.Value.Month == DateTime.Now.Month
             && o.Repair_start_date.Value.Year == DateTime.Now.Year
              && o.Status.Equals("Начат ремонт"))
                .Count();
                int dataComplite = unitOfWork.GetOrderRepository().GetList().Where(o => o.Repair_completion_date != null &&
            o.Repair_completion_date.Value.Month == DateTime.Now.Month
             && o.Repair_completion_date.Value.Year == DateTime.Now.Year
             && o.Status.Equals("Ремонт закончен"))
                .Count();
                int dataIssue = unitOfWork.GetOrderRepository().GetList().Where(o => o.Date_issue != null &&
            o.Date_issue.Value.Month == DateTime.Now.Month
             && o.Date_issue.Value.Year == DateTime.Now.Year
             && o.Status.Equals("Заказ завершён"))
                .Count();

            List<int> data = new List<int>();
            data.Add(dataAccept);
            data.Add(dataStart);
            data.Add(dataComplite);
            data.Add(dataIssue);

            return new ObjectResult(data);
        }

        class Data_Year_Price
        {
            public List<string> Mounth { get; set; } = new List<string>();
            public List<decimal?> Counts { get; set; } = new List<decimal?>();
        }

        [HttpGet("year_orders_price")]
        public async Task<IActionResult> GetYear_orders_price()
        {
            Data_Year_Price data = new Data_Year_Price();
            string[] mounth = new string[] { "ЯНВ", "ФЕВР", "МАРТ", "АПР", "МАЙ", "ИЮНЬ", "ИЮЛЬ", "АВГ", "СЕНТ", "ОКТ", "НОЯБ", "ДЕК" };
            var list = unitOfWork.GetOrderRepository().GetList().ToList();
            for (int i = 11; i >= 0; i--)
            {                
                decimal? dataAccept = unitOfWork.GetOrderRepository().GetList().Where(o => o.Date_issue != null && o.Date_issue.Value.Month == DateTime.Now.AddMonths(-i).Month)
                .Sum(o => o.PriceOrder);
                data.Counts.Add(dataAccept);
                data.Mounth.Add(mounth[DateTime.Now.AddMonths(-i).Month - 1]);
            }

            return new ObjectResult(data);
        }
    }
}
