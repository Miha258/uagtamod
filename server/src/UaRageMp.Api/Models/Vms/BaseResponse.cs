namespace UaRageMp.Api.Models.Vms
{
    public class BaseResponse<T> where T : new()
    {
        public T Data { get; set; }
        public Error Error { get; set; }

        public BaseResponse()
        {
            Data = new T();
        }

        public BaseResponse(string errorDescription)
        {
            Error = new Error
            {
                IsError = true,
                Description = errorDescription
            };
        }
    }

    public class Error
    {
        public bool IsError { get; set; }
        public string Description { get; set; }
    }
}

