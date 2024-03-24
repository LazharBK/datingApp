using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository : IUserRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public UserRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<MemberDto> GetMemberByUsernameAsync(string name)
    {
        return await _context.Users
        .Where(appUser => appUser.UserName == name)
        /*.Select(user => new MemberDto
        {
            Id = user.Id,
            UserName = user.UserName,
            KnownAs = user.KnownAs
            // etc .., Or use AutoMapper
        })*/
        .ProjectTo<MemberDto>(_mapper.ConfigurationProvider) // using AutoMapper
        .SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<MemberDto>> GetMembersAsync()
    {
        // the projectTo take care of eager lodding (.Include(appUser => appUser.Photos))
        return await _context.Users.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    public async Task<AppUser> GetUserByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<AppUser> GetUserByUsernameAsync(string name)
    {
        return await _context.Users
        .Include(appUser => appUser.Photos)
        .SingleOrDefaultAsync(appUser => appUser.UserName == name);
    }

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
        return await _context.Users
        .Include(appUser => appUser.Photos)
        .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public void Update(AppUser user)
    {
        _context.Entry(user).State = EntityState.Modified;
    }
}
