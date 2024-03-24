namespace API;

public static class DateTimeExtensions
{
    public static int CalculateAge(this DateOnly dob)
    {
        var tody = DateOnly.FromDateTime(DateTime.UtcNow);
        var age = dob.Year - tody.Year;
        if (dob > tody.AddYears(-age)) age--;
        return age;
    }
}
