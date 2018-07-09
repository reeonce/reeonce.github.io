---
layout: default
comments: true
---


```c++
class CommandFactory {
public:
    virtual std::shared_ptr<Command> Create(Context *context,
        const std::shared_ptr<CommandParser> &parser) = 0;
};

#define REGISTER_COMMAND(klass, command_name, handler) \
    class klass##Factory : public CommandFactory { \
    public: \
        klass##Factory() \
        { \
            handler.RegisterCommand(command_name, this); \
        } \
        std::shared_ptr<Command> Create(Context *context,\
            const std::shared_ptr<CommandParser> &parser) override { \
            Command *command = new klass(context, parser); \
            return std::shared_ptr<Command>(command); \
        }\
        static klass##Factory global##klass##Factory; \
    };\
    klass##Factory klass##Factory::global##klass##Factory
```